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