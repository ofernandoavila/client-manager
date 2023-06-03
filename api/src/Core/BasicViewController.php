<?php

namespace Avilamidia\ClientManager\Core;

class BasicViewController extends Controller {
    public function __construct(Repository $repo = null) {
        parent::__construct($repo);
    }
    
    public function Render($path, $dataTransfer = [])
    {
        global $data;

        $data = $dataTransfer;

        $filePath = $this->config['template_dir'] . $path . '.php';

        if (file_exists($filePath)) {
            require_once $filePath;
        } else {
            require_once $this->config['template_dir'] . '404.php';
        }
    }

    public static function RenderView(View $view)
    {
        global $data, $configs;

        $data = $view->data;

        $filePath = $configs['template_dir'] . $view->viewFilePath . '.php';

        if (file_exists($filePath)) {
            require_once $filePath;
        } else {
            require_once $configs['template_dir'] . '404.php';
        }
    }
}