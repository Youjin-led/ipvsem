<?php
/**
 * POST /api/cleanup.php  (X-DEPO-SECRET: <secret из config.php>)
 * body: id=IPV-2026-xxxxx
 * Удаляет тестовую запись из реестра.
 */
require __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    depo_http_error(405, 'Только POST');
}
$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    depo_http_error(500, 'Нет config.php на сервере.');
}
$cfg = require $configFile;

$secret = (string)($_SERVER['HTTP_X_DEPO_SECRET'] ?? '');
if (!hash_equals((string)($cfg['secret'] ?? ''), $secret)) {
    depo_http_error(403, 'Секрет неверный');
}
$id = (string)($_POST['id'] ?? '');
if (!preg_match('/^IPV-\d{4}-\d+$/', $id)) {
    depo_http_error(400, 'Неверный id');
}

$pdo = depo_db($cfg['db']);
$stmt = $pdo->prepare('DELETE FROM deposits WHERE record_id = :rid');
$stmt->execute([':rid' => $id]);
depo_http_ok(['deleted' => $stmt->rowCount() > 0, 'id' => $id]);