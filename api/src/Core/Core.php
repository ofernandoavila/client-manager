<?php

namespace Avilamidia\ClientManager\Core;
use Avilamidia\ClientManager\Controller\SystemController;
use Avilamidia\ClientManager\Helper\EntityManagerCreator;

class Core {
    public Request $request;
    public Response $response;
    private Array $config;

    public function __construct() {
        global $configs;

        header("Access-Control-Allow-Origin: *");

        $this->config = $configs;
        $this->request = new Request();
        $this->response = new Response();
    }
    public function Init() {
        global $router;

        if($this->request->url != '/system/reset-preferences') SystemController::CheckSystemIntegrity();

        foreach($router->GetRoutes() as $route) {
            if($this->request->method == $route['method']) {
                if($this->request->url == $route['path']) {
                    $this->request->route = $route;
                }
            }
        }

        if(isset($this->request->route)) {
            $this->request->config['global'] = $this->config;

            $this->request->route['function']($this->request, $this->response);
            
            if($this->request->isJson) {
                $this->response->SetResponseType('application/json');
                echo json_encode($this->response->SendResponse());
                return;
            } else {
                if(isset($this->response->view)) {
                    $this->response->view->data = $this->response->SendResponse();
                    return BasicViewController::RenderView($this->response->view);
                } else {
                    throw new \Exception('This type of response requires a view');
                }
            }
        } else {
            
            if($this->request->isJson) {
                $this->response->SetResponseType('application/json');
                $this->response->SetCode(404);
                $this->response->AppendData("Current route was not found", 'error_message');
                $this->response->AppendData($this->request->url, 'url');
                $this->response->AppendData($this->request->data, 'data');
                $this->response->AppendData($this->request->method, 'method');
                $this->response->AppendData($this->request->isJson, 'isJson');

                echo json_encode($this->response->SendResponse());
                return;
            }

            
            $controller = new BasicViewController();

            return $controller->Render('');
        }

    }

    public static function StartUpProject($applicationMode = 'dev') {
        global $router, $core, $configs, $applicationMode, $em, $system, $labels;
        date_default_timezone_set('America/Sao_Paulo');

        
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '/../config');
        $dotenv->load();
        
        $em = EntityManagerCreator::createEntityManager();
        
        session_start();
        session_regenerate_id();
        
        $configs = Config::GetConfigs();
        Resources::LoadTextResource();

        $system = new System();

        require_once __DIR__ . '/../Helper/SlugFormatter.php';
        require_once __DIR__ . '/../Helper/Map.php';
        require_once __DIR__ . '/../Helper/Debug.php';
        require_once __DIR__ . '/../Helper/Redirect.php';

        $core = new Core();
        $router = new Router();

        require_once __DIR__ . '/../../routes.php';
        
        try {
            $core->Init();
        } catch (\Exception $e) {
            $core->request->data['error']['code'] = $e->getCode();
            $core->request->data['error']['message'] = $e->getMessage();

            $core->response->SetCode(406);

            Response::ThrowError($core->request, $core->response);
        }
    }
}