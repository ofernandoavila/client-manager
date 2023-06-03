<?php

return array(
    'prefix' => '/client-manager/api',
    'template_dir' => __DIR__ . '/../templates/',
    'base_url' => 'http://localhost/client-manager/api',
    'storage_url' => 'http://localhost/client-manager-storage/',
    'storage_dir' => $_ENV['LOCAL_STORAGE_DIR'],
    'scripts_dir' => '',
    'database' => [
        'host' => $_ENV['DB_HOST'],
        'user' => $_ENV['DB_USER'],
        'password' => $_ENV['DB_PASSWORD'] ?? '',
        'database' => $_ENV['DB_DATABASE'],
        'port' => 3306
    ]
);