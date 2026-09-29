<?php
/**
 * GET /api/verify.php?id=IPV-2026-xxxxx
 * Возвращает публичную запись реестра ИС для верификации.
 */
require __DIR__ . '/lib.php';

header('Access-Control-Allow-Origin: *');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    depo_http_error(500, 'Нет config.php на сервере.');
}
$cfg = require $configFile;

$id = (string)($_GET['id'] ?? '');
if ($id === '') {
    depo_http_error(400, 'Укажите ?id=');
}
$id = preg_replace('/[^A-Za-z0-9_\-]/', '', $id);

$pdo = depo_db($cfg['db']);
$stmt = $pdo->prepare(
    'SELECT record_id, created_at, author, holder, title, tags,
            algo1, hash1, algo2, hash2, files_count, status,
            public_url, container_url, local_size, created_ts
       FROM deposits WHERE record_id = :rid LIMIT 1'
);
$stmt->execute([':rid' => $id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    depo_http_error(404, 'Запись не найдена в реестре.');
}

depo_http_ok([
    'record' => [
        'id' => $row['record_id'],
        'createdAt' => $row['created_at'],
        'author' => $row['author'],
        'holder' => $row['holder'],
        'title' => $row['title'],
        'tags' => json_decode((string)$row['tags'], true) ?: [],
        'algo1' => $row['algo1'],
        'hash1' => $row['hash1'],
        'algo2' => $row['algo2'],
        'hash2' => $row['hash2'],
        'filesCount' => (int)$row['files_count'],
        'status' => $row['status'],
        'publicUrl' => $row['public_url'],
        'localStored' => $row['local_size'] > 0,
        'createdTs' => $row['created_ts'],
    ],
]);