<?php

return [
    'paths' => ['api/*','auth/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000','http://127.0.0.1:3000','http://localhost:5173','http://localhost:3002','http://localhost:3003','http://127.0.0.1:3003'], 
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => FALSE,
];
