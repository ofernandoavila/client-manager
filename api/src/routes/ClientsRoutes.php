<?php
use Avilamidia\ClientManager\Controller\ClientController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Model\Client;

global $router;

$router->get('/clients', function (Request $request, Response $response) {
    $controller = new ClientController();
    $clients = $controller->GetAllClients();

    if($clients != null) {
        $response->AppendData($clients);
        $response->SetCode(200);
    } else {
        $response->SetCode(404);
        $response->AppendData("There is no clients in database", 'message');
    }
});

$router->post('/clients/new', function (Request $request, Response $response) {
    $client = new Client();

    $client->name = $request->data['name'];
    $client->email = $request->data['email'];
    $client->phone = $request->data['phone'];
    $client->address = $request->data['address'];
    $client->city = $request->data['city'];
    $client->state = $request->data['state'];
    $client->zip = $request->data['zip'];

    $controller = new ClientController();

    if($controller->SaveClient($client)) {
        $response->AppendData("Client saved successfully!", 'message');
        $response->AppendData("success", 'status');
        $response->SetCode(201);
    } else {
        $response->SetCode(500);
        $response->AppendData("An error occurred while saving", 'message');
    }
});

$router->get('/clients/get', function (Request $request, Response $response) {
    $controller = new ClientController();

    $client = $controller->GetClientById($request->data['client_id']);

    if ($client !== null) {
        $response->AppendData($client);
        $response->SetCode(200);
    } else {
        $response->SetCode(404);
        $response->AppendData("The client was not found", 'message');
    }
});

$router->patch('/clients/edit', function (Request $request, Response $response) {
    $controller = new ClientController();
    $client = $controller->GetClientById(intval($request->data['client_id']));

    $client = Map($request->data, Client::class);

    $client->id = $request->data['client_id'];

    if ($client !== null) {
        if ($controller->EditClient($client)) {
            $current = $controller->GetClientById(intval($request->data['client_id']));
            $response->AppendData("The client '" . $current->name . "' was edited!", 'message');
            $response->SetCode(200);
        } else {
            $response->SetCode(500);
            $response->AppendData("An error occurred while saving", 'message');
        }
    } else {
        $response->SetCode(404);
        $response->AppendData("The client was not found", 'message');
    }
});

$router->get('/clients/delete', function (Request $request, Response $response) {
    $controller = new ClientController();
    $client = $controller->GetClientById(intval($request->data['client_id']));

    if ($client !== null) {
        if ($controller->DeleteClient($client)) {
            $response->AppendData("The client '" . $client->name . "' was deleted!", 'message');
            $response->AppendData("danger", 'status');
            $response->SetCode(200);
        } else {
            $response->SetCode(500);
            $response->AppendData("An error occurred while saving", 'message');
        }
    } else {
        $response->SetCode(404);
        $response->AppendData("The client was not found",'message');
    }
});