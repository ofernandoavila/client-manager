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
            foreach($data as $key => $value) {
                $this->data[$key] = $value;
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
}