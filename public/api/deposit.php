<?php
/**
 * POST /api/deposit.php
 * Принимает 2-й (финальный) контейнер + метаданные, сохраняет копию
 * в защищённое хранилище сервера, грузит на Яндекс.Диск (WebDAV),
 * делает публичную ссылку и пишет запись в MySQL (реестр ИС).
 *
 * Поля multipart: container2 (file), payload (JSON), secret (string)
 */
require __DIR__ . '/lib.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    depo_http_error(405, 'Только POST');
}

@ini_set('upload_max_filesize', '128M');
@ini_set('post_max_size', '128M');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    depo_http_error(500, 'Нет config.php — скопируйте config.example.php и заполните настройки.');
}
$cfg = require $configFile;

if (empty($_POST['secret']) || !hash_equals($cfg['secret'] ?? '', (string)$_POST['secret'])) {
    depo_http_error(403, 'Неверный секрет.');
}

$payload = json_decode((string)($_POST['payload'] ?? '{}'), true);
if (!is_array($payload)) {
    depo_http_error(400, 'Некорректный payload.');
}

$required = [
    'recordId', 'holder', 'title', 'hash1', 'algo1', 'hash2', 'algo2',
];
foreach ($required as $f) {
    if (empty($payload[$f])) {
        depo_http_error(400, "Не заполнено поле: {$f}");
    }
}
if (empty($_FILES['container2']) || ($_FILES['container2']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    depo_http_error(400, 'Файл container2 не загружен.');
}

$recordId = preg_replace('/[^A-Za-z0-9_\-]/', '', (string)$payload['recordId']);
$c2Name = $recordId . '-container-2.zip';
$c2Tmp = $_FILES['container2']['tmp_name'];
$c2Size = (int)$_FILES['container2']['size'];
if ($c2Size <= 0) {
    depo_http_error(400, 'Пустой контейнер.');
}
if ($c2Size > 128 * 1024 * 1024) {
    depo_http_error(413, 'Контейнер больше 128 МБ.');
}

// 1. Локальное защищённое хранилище
$storeDir = DEPO_STORE_DIR;
if (!is_dir($storeDir)) {
    @mkdir($storeDir, 0755, true);
}
$localPath = $storeDir . '/' . $recordId . '.zip';
if (!move_uploaded_file($c2Tmp, $localPath)) {
    // fallback: если move не сработал — копируем
    if (!copy($c2Tmp, $localPath)) {
        depo_http_error(500, 'Не удалось сохранить контейнер в хранилище.');
    }
}
$localSize = (int)@filesize($localPath);

// 2. Яндекс.Диск (WebDAV) + публичная ссылка
$yandexErr = null;
$publicUrl = '';
if (!empty($cfg['yandex']['token']) && $cfg['yandex']['token'] !== 'ПУСТОЙ_ТОКЕН') {
    $token = (string)$cfg['yandex']['token'];
    $folder = (string)($cfg['yandex']['folder'] ?? '/ipvsem/deposits');
    $webdav = 'https://webdav.yandex.ru';
    $api = 'https://cloud-api.yandex.net/v1/disk';

    $resp = depo_webdav(
        'MKCOL',
        $webdav . $folder,
        $token
    );
    // 201 создана, 405 уже существует — норм. 401 — токен неверный.
    if ($resp->code === 401) {
        $yandexErr = 'Яндекс.Диск: неверный токен.';
    }

    // PUT архива (верхний уровень папки)
    $putPath = $folder . '/' . $c2Name;
    $resp = depo_webdav(
        'PUT',
        $webdav . $putPath,
        $token,
        file_get_contents($localPath)
    );
    if ($resp->code >= 400) {
        $yandexErr = 'Яндекс.Диск: ошибка загрузки (' . $resp->code . ')' . $resp->body;
    } else {
        // Публикация файла -> публичная ссылка
        $pub = depo_api_public($api, $token, $putPath);
        if (is_array($pub) && !empty($pub['href'])) {
            $publicUrl = $pub['href'];
        }
    }
}

// 3. MySQL: реестр ИС
$db = $cfg['db'];
$pdo = depo_db($db);
depo_ensure_table($pdo);

$createdAt = (string)($payload['createdAt'] ?? gmdate('Y-m-d H:i:s'));
$author = (string)($payload['author'] ?? '');
$tags = (array)($payload['tags'] ?? []);
$storages = (array)($payload['storages'] ?? []);
$filesCount = (int)($payload['filesCount'] ?? 1);

// Публичная ссылка Яндекса попадает в список хранилищ, если её удалось получить
if ($publicUrl) {
    $found = false;
    foreach ($storages as &$s) {
        if (is_array($s) && ($s['name'] ?? '') === 'Яндекс.Диск') {
            $s['ref'] = $publicUrl;
            $found = true;
        }
    }
    unset($s);
    if (!$found) {
        $storages[] = [
            'name' => 'Яндекс.Диск',
            'ref' => $publicUrl,
            'stampedAt' => $createdAt,
        ];
    }
}

$stmt = $pdo->prepare(
    'INSERT INTO deposits
        (record_id, created_at, author, holder, title, tags,
         algo1, hash1, algo2, hash2, files_count, status, public_url,
         container_url, local_size, error_log, created_ts)
     VALUES
        (:rid, :created, :author, :holder, :title, :tags,
         :algo1, :hash1, :algo2, :hash2, :fc, :status, :pub,
         :curl, :lsize, :err, NOW())
     ON DUPLICATE KEY UPDATE
        holder=VALUES(holder), status=VALUES(status), public_url=VALUES(public_url),
        container_url=VALUES(container_url), error_log=VALUES(error_log)'
);

$inserted = $stmt->execute([
    ':rid' => $recordId,
    ':created' => $createdAt,
    ':author' => $author,
    ':holder' => (string)$payload['holder'],
    ':title' => (string)$payload['title'],
    ':tags' => json_encode($tags, JSON_UNESCAPED_UNICODE),
    ':algo1' => (string)$payload['algo1'],
    ':hash1' => (string)$payload['hash1'],
    ':algo2' => (string)$payload['algo2'],
    ':hash2' => (string)$payload['hash2'],
    ':fc' => $filesCount,
    ':status' => 'Депонирован',
    ':pub' => $publicUrl,
    ':curl' => $publicUrl ?: '',
    ':lsize' => $localSize,
    ':err' => $yandexErr ?: '',
]);
if ($inserted === false) {
    depo_http_error(500, 'Не удалось записать в реестр.');
}

depo_http_ok([
    'recordId' => $recordId,
    'createdAt' => $createdAt,
    'publicUrl' => $publicUrl,
    'localStored' => true,
    'localSize' => $localSize,
    'yandexError' => $yandexErr,
    'storages' => $storages,
]);

/* ---------- helpers ---------- */

function depo_webdav(string $method, string $url, string $token, string $body = ''): object
{
    $ch = curl_init($url);
    $headers = [
        'Authorization: OAuth ' . $token,
    ];
    if ($method === 'PUT') {
        $headers[] = 'Content-Type: application/zip';
    }
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 60,
    ]);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return (object)[
        'code' => $code,
        'body' => is_string($res) ? $res : ($err ?: ''),
    ];
}

function depo_api_public(string $api, string $token, string $path): ?array
{
    $url = $api . '/resources/publish?path=' . urlencode($path);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token],
        CURLOPT_TIMEOUT => 60,
    ]);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300) {
        return null;
    }
    $j = json_decode((string)$res, true);
    return is_array($j) ? $j : null;
}

function depo_db(array $cfg): PDO
{
    try {
        return new PDO(
            'mysql:host=' . $cfg['host'] . ';dbname=' . $cfg['name'] . ';charset=utf8mb4',
            $cfg['user'],
            $cfg['pass'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    } catch (PDOException $e) {
        depo_http_error(500, 'MySQL: ' . $e->getMessage());
    }
}

function depo_ensure_table(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS deposits (
            record_id VARCHAR(40) PRIMARY KEY,
            created_at VARCHAR(64) NOT NULL,
            author VARCHAR(255) NOT NULL DEFAULT '',
            holder VARCHAR(255) NOT NULL DEFAULT '',
            title VARCHAR(255) NOT NULL DEFAULT '',
            tags TEXT NULL,
            algo1 VARCHAR(32) NOT NULL DEFAULT '',
            hash1 TEXT NOT NULL,
            algo2 VARCHAR(32) NOT NULL DEFAULT '',
            hash2 TEXT NOT NULL,
            files_count INT NOT NULL DEFAULT 1,
            status VARCHAR(64) NOT NULL DEFAULT 'Депонирован',
            public_url TEXT NULL,
            container_url TEXT NULL,
            local_size BIGINT NULL,
            error_log TEXT NULL,
            created_ts DATETIME NULL,
            KEY idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}