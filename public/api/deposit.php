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

// 2. Яндекс.Диск (cloud-api REST) + публичная ссылка
$yandexErr = null;
$publicUrl = '';
if (!empty($cfg['yandex']['token']) && $cfg['yandex']['token'] !== 'ПУСТОЙ_ТОКЕН') {
    $token = (string)$cfg['yandex']['token'];
    $folder = trim((string)($cfg['yandex']['folder'] ?? '/ipvsem/deposits'), '/');
    $api = 'https://cloud-api.yandex.net/v1/disk';

    // Создать папку (рекурсивно, как цепочку сегментов)
    $parts = explode('/', $folder);
    $cur = '';
    foreach ($parts as $seg) {
        $cur .= '/' . $seg;
        depo_api_mkdir($api, $token, trim($cur, '/'));
    }

    $putPath = $folder . '/' . $c2Name;
    $up = depo_api_upload($api, $token, $putPath, $localPath);
    if (!$up) {
        $yandexErr = 'Яндекс.Диск: ошибка загрузки контейнера.';
    } else {
        // Публикация файла -> публичная ссылка
        $publicUrl = depo_api_publish($api, $token, $putPath);
        if (!$publicUrl) {
            $yandexErr = 'Яндекс.Диск: файл загружен, но ссылка не опубликована.';
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

function depo_api_mkdir(string $api, string $token, string $path): void
{
    $url = $api . '/resources?path=' . urlencode($path);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token],
        CURLOPT_TIMEOUT => 60,
    ]);
    curl_exec($ch);
    curl_close($ch);
    // 201 создана, 409 уже существует, 423 в другой очереди — все ок или несущественны
}

function depo_api_upload(string $api, string $token, string $path, string $localPath): bool
{
    $href = depo_api_call('GET', $api . '/resources/upload?path=' . urlencode($path) . '&overwrite=true', $token);
    $href = is_array($href) ? ($href['href'] ?? '') : '';
    if (!$href) {
        return false;
    }
    $ch = curl_init($href);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_PUT => true,
        CURLOPT_INFILE => fopen($localPath, 'rb'),
        CURLOPT_INFILESIZE => (int)filesize($localPath),
        CURLOPT_TIMEOUT => 300,
    ]);
    curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    return $code >= 200 && $code < 300;
}

function depo_api_publish(string $api, string $token, string $path): ?string
{
    depo_api_call('PUT', $api . '/resources/publish?path=' . urlencode($path), $token);
    $meta = depo_api_call('GET', $api . '/resources?path=' . urlencode($path), $token);
    return is_array($meta) && !empty($meta['public_url']) ? $meta['public_url'] : null;
}

function depo_api_call(string $method, string $url, string $token)
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token],
        CURLOPT_TIMEOUT => 60,
    ]);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300 || !is_string($res)) {
        return null;
    }
    $j = json_decode($res, true);
    return is_array($j) ? $j : null;
}

function depo_store_local(array $cfg, string $recordId, string $tmpPath): string
{
    $dir = rtrim(DEPO_STORE_DIR, '/\\') . '/' . $recordId;
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        depo_http_error(500, 'Нет доступа для записи в хранилище');
    }
    $dest = $dir . '/container-2.zip';
    if (!rename($tmpPath, $dest)) {
        if (!copy($tmpPath, $dest)) {
            depo_http_error(500, 'Ошибка сохранения контейнера в хранилище');
        }
        @unlink($tmpPath);
    }
    return $dest;
}

function depo_yandex_get_path(string $base, string $recordId): string
{
    $base = trim($base, '/');
    return 'disk:/' . ($base ? $base . '/' . $recordId : $recordId) . '/container-2.zip';
}

function depo_yandex_request(string $method, string $url, array $options = []): ?array
{
    $ch = curl_init($url);
    $_opt = [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
    ] + ($options['headers'] ?? []) + ($options['http'] ?? []);
    curl_setopt_array($ch, $_opt);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    return ($code >= 200 && $code < 300) ? ['code' => $code, 'body' => (string)$res] : null;
}

if (!function_exists('depo_yandex_upload')) {
    function depo_yandex_upload(string $token, string $remotePath, string $localPath): ?string
    {
        $base = 'https://webdav.yandex.ru/';
        $ch = curl_init($base . ltrim($remotePath, '/'));
        curl_setopt_array($ch, [
            CURLOPT_PUT => true,
            CURLOPT_INFILE => fopen($localPath, 'rb'),
            CURLOPT_INFILESIZE => filesize($localPath),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 300,
            CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token],
        ]);
        curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if ($code < 200 || $code >= 300) {
            // Публикацию до выгрузки не делаем — вернём null и это станет ошибкой Диска
            return null;
        }

        // Запрос публичной ссылки
        $pub = @file_get_contents(
            'https://cloud-api.yandex.net/v1/disk/resources/publish?path=' . rawurlencode($remotePath),
            false,
            stream_context_create(['http' => ['header' => 'Authorization: OAuth ' . $token, 'timeout' => 30]])
        );
        $j = $pub ? json_decode($pub, true) : null;
        return ($j['href'] ?? null) ?: (isset($j['error']) ? null : null);
    }
}