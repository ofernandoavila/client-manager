<?php 

namespace Avilamidia\ClientManager\Core;

class Resources {
    public static function LoadTextResource(string $language = 'en') {
        global $labels;

        
        switch($language) {
            case 'pt-br';
            $language = 'pt-br';
            break;
            default:
            $language = 'en-us';
            break;
        }
        
        $file = __DIR__ . '/../Resources/' . $language . '.php';
        
        if (file_exists($file)) {
            $labels = require_once $file;
        } else throw new \RuntimeException();
    }
}