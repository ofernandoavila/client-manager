<?php

namespace Avilamidia\ClientManager\Core;

final class Request {
    public array $config;
    public string $url;
    public string $method;
    public array $route;
    public bool $isJson = false;
    public array $data;

    public function __construct() {
        global $configs;
        $requestData = str_replace($configs['prefix'], "", filter_var($_SERVER['REQUEST_URI'], FILTER_SANITIZE_URL));
        $url = explode("?", $requestData)[0];

        $this->url = $url;
        $this->method = $_SERVER['REQUEST_METHOD'];

        $apacheHeaders = apache_request_headers();
        
        if(isset($apacheHeaders['Content-Type']) && $apacheHeaders['Content-Type'] == "application/json") {
            $this->isJson = true;
        }
        
        $this->data = $this->GetRequestData() ?? [];
    }

    private function GetRequestData() {
        global $configs;
        switch($this->method) {
            default:
                $out = [];
                if($this->isJson && file_get_contents('php://input') != null) {
                    $out = json_decode( file_get_contents('php://input'), true );
                    return $out;
                }

                if(sizeof($_FILES) > 0) {
                    foreach($_FILES as $key => $value) {
                        $out[$key] = $value;
                    }
                }

                if(sizeof($_POST) > 0) {
                    foreach($_POST as $key => $value) {
                        $out[$key] = $value;
                    }
                }

                return $out;
            case 'GET':
                $rawData = explode("?", str_replace($configs['prefix'], "", filter_var($_SERVER['REQUEST_URI'])));
                $data = [];

                if(isset($rawData[1])) {
                    if($rawData[1] != '') {
                        foreach(explode("&", $rawData[1]) as $item) {
                            $item = explode("=", $item);

                            if(strpos($item[1], '%20')) {
                                $item[1] = str_replace('%20',' ', $item[1]);
                            }

                            $data[$item[0]] = $item[1];
                        }
                    }
                }

            return $data;

            case 'DELETE':
                $rawData = explode("?", str_replace($configs['prefix'], "", filter_var($_SERVER['REQUEST_URI'])));
                $data = [];

                if (isset($rawData[1])) {
                    if ($rawData[1] != '') {
                        foreach (explode("&", $rawData[1]) as $item) {
                            $item = explode("=", $item);

                            if (strpos($item[1], '%20')) {
                                $item[1] = str_replace('%20', ' ', $item[1]);
                            }

                            $data[$item[0]] = $item[1];
                        }
                    }
                }

                return $data;
        }
    }
}