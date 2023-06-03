<?php

namespace Avilamidia\ClientManager\Core;

class Router {
    private Array $routes = [];

    private function AddRoute($method, $path, $callback) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'function' => $callback
        ];
    }

    public function GetRoutes() {
        return $this->routes;
    }

    public function get($path, $callback) {
        $this->AddRoute('GET', $path, $callback);
    }

    public function post($path, $callback) {
        $this->AddRoute('POST', $path, $callback);
    }

    public function put($path, $callback) {
        $this->AddRoute('PUT', $path, $callback);
    }

    public function delete($path, $callback) {
        $this->AddRoute('DELETE', $path, $callback);
    }

    public function patch($path, $callback) {
        $this->AddRoute('PATCH', $path, $callback);
    }
    public function head($path, $callback) {
        $this->AddRoute('HEAD', $path, $callback);
    }
    public function options($path, $callback) {
        $this->AddRoute('OPTIONS', $path, $callback);
    }

    public static function CheckIfUserIsLogged() {
        if(!isset($_SESSION['user_session'])) Redirect('/');
    }
}