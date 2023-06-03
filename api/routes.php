<?php

use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Core\View;

global $router;

$router->get('/', function(Request $request, Response $response) {
    $response->SetView(new View('index'));

    $response->AppendData("Welcome to the Avilamidia Lab! Here we try crazy things :D", "message");
    $response->SetCode(200);
});

require __DIR__ . '/src/routes/ClientsRoutes.php';
require __DIR__ . '/src/routes/OrdersRoutes.php';