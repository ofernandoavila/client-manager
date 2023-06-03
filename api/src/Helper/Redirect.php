<?php

use ofernandoavila\Community\Core\Config;

function Redirect($url) {
    global $configs;
    
    return header('Location: ' . $configs['base_url'] . $url);
}