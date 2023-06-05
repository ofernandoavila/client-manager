<?php
use Avilamidia\ClientManager\Controller\SystemController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;

global $router;

$router->get('/system/reset-preferences', function (Request $request, Response $response) {
    if(SystemController::ResetAllPreferences()) {
        $response->AppendData("All preferences was reset to factory mode.", "message");
        $response->SetCode(200);
    } else {
        $response->AppendData("An error ocurred while trying to reset preferences.", "message");
        $response->SetCode(500);
    }
});