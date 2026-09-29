<?php
/**
 * Личное хранилище депонирований.
 * Файл загружается НЕ в web-каталог (docs/), а в защищённую папку,
 * куда нет прямого доступа по HTTP. Путь задаётся здесь.
 */
if (!defined('DEPO_STORE_DIR')) {
    define('DEPO_STORE_DIR', dirname(__DIR__) . '/_store');
}

if (!function_exists('depo_http_error')) {
    function depo_http_error(int $code, string $message): void
    {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!function_exists('depo_http_ok')) {
    function depo_http_ok(array $data): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => true] + $data, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!function_exists('depo_db')) {
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
}

if (!function_exists('depo_ensure_table')) {
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
}