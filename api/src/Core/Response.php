<?php

namespace Avilamidia\ClientManager\Core;

final class Response {

    public array $data;
    public View $view;
    public function __construct() {
        $this->data = [];
    }
    public function SetResponseType(string $contentType) {
        header("Content-Type: $contentType");
    }
    public function AppendData($data, $key = '') {
        if(is_array($data)) {
            if($key == '') {
                foreach($data as $key => $value) {
                    $this->data[$key] = $value;
                }
            } else {
                $this->data[$key] = $data;
            }
        } else if (is_object($data)) {
            if($key == '') {
                foreach(get_object_vars($data) as $key => $value) {
                    $this->data[$key] = $value;
                }
            } else {
                $this->data[$key] = $data;
            }
        } else if ($key != '') {
            $this->data[$key] = $data;
        } else {
            $this->data[uniqid()] = $data;
        }
    }

    public function SetCode(int $code) {
        http_response_code($code);
    }

    public function SendResponse() {
        return sizeof($this->data) > 0  ? $this->data : [];
    }

    public function SetView(View $view) {
        $this->view = $view;
    }

    public static function PushResponseOut(Request $request, Response $response) {
        if($request->isJson) {
            $response->SetResponseType('application/json');
            $response->SetCode(404);
            $response->AppendData("Current route was not found", 'message');
            $response->AppendData($request->url, 'url');
            $response->AppendData($request->data, 'data');
            $response->AppendData($request->method, 'method');

            echo json_encode($response->SendResponse());
            return;
        }        
        $controller = new BasicViewController();

        return $controller->Render('');
    }

    public static function ThrowError(Request $request, Response $response) {
        if($request->isJson) {
            $response->SetResponseType('application/json');
            $response->AppendData("Current route was not found", 'message');
            $response->AppendData($request->url, 'url');
            $response->AppendData($request->method, 'method');
            $response->AppendData($request->data);

            echo json_encode($response->SendResponse());
            return;
        }        
        $controller = new BasicViewController();

        return $controller->Render('');
    }
}