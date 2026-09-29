<?php
/**
 * GET /api/check.php — диагностика: PHP, MySQL, хранилище, токен Диска.
 * Не выводит секретов, только статусы.
 */
require __DIR__ . '/lib.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$out = [
    'php' => PHP_VERSION,
    'extensions' => [
        'pdo_mysql' => extension_loaded('pdo_mysql'),
        'curl' => extension_loaded('curl'),
    ],
];

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    $out['config'] = 'MISSING (скопируйте config.example.php -> config.php)';
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    exit;
}
$cfg = require $configFile;
$out['config'] = 'OK';

$storeDir = DEPO_STORE_DIR;
$out['storeDir'] = $storeDir;
$out['storeWritable'] = is_dir($storeDir) ? is_writable($storeDir) : @mkdir($storeDir, 0755, true) !== false;

try {
    $pdo = depo_db($cfg['db']);
    $out['mysql'] = 'OK (' . $pdo->query('SELECT VERSION()')->fetchColumn() . ')';
    $pdo->exec('CREATE TABLE IF NOT EXISTS deposits (
        record_id VARCHAR(40) PRIMARY KEY,
        created_at VARCHAR(64) NOT NULL,
        author VARCHAR(255) NOT NULL DEFAULT \'\',
        holder VARCHAR(255) NOT NULL DEFAULT \'\',
        title VARCHAR(255) NOT NULL DEFAULT \'\',
        tags TEXT NULL,
        algo1 VARCHAR(32) NOT NULL DEFAULT \'\',
        hash1 TEXT NOT NULL,
        algo2 VARCHAR(32) NOT NULL DEFAULT \'\',
        hash2 TEXT NOT NULL,
        files_count INT NOT NULL DEFAULT 1,
        status VARCHAR(64) NOT NULL DEFAULT \'Депонирован\',
        public_url TEXT NULL,
        container_url TEXT NULL,
        local_size BIGINT NULL,
        error_log TEXT NULL,
        created_ts DATETIME NULL,
        KEY idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    $out['mysql_table'] = 'OK';
} catch (Throwable $e) {
    $out['mysql'] = 'ERROR: ' . $e->getMessage();
}

$token = $cfg['yandex']['token'] ?? '';
$out['yandex'] = ($token && $token !== 'ПУСТОЙ_ТОКЕН') ? 'set' : 'MISSING (токен не задан — контейнеры будут храниться локально)';

if ($out['yandex'] === 'set') {
    $ch = curl_init('https://cloud-api.yandex.net/v1/disk');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token],
        CURLOPT_TIMEOUT => 30,
    ]);
    $res = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($code === 200) {
        $out['yandex'] = 'OK (токен рабочий)';
    } else {
        $out['yandex'] = "ERROR ($code): токен не принят Яндексом";
    }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE);