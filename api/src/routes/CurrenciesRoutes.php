<?php
use Avilamidia\ClientManager\Controller\CurrencyController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Exception\FewArgumentsException;
use Avilamidia\ClientManager\Model\Currency;

global $router;

$context = "currencies";

$router->get('/' . $context, function(Request $request, Response $response) {
    $controller = new CurrencyController();
    $currencies = $controller->GetAll();
    if($currencies) {
        $response->AppendData($currencies);
        $response->SetCode(200);
        return;
    } else {
        $response->AppendData("No currencies was found", 'message');
        $response->SetCode(404);
        return;
    }
});

$router->post('/' . $context . '/new', function(Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, ['name', 'symbol'])) throw new FewArgumentsException;
    $controller = new CurrencyController();

    $currency = new Currency();
    $currency->name = $request->data['name'];
    $currency->symbol = $request->data['symbol'];

    if($controller->Save($currency)) {
        $response->AppendData("The currency '" . $currency->name . "' was sucessfully created", 'message');
        $response->SetCode(201);
        return;
    } else {
        $response->AppendData("An error ocurred attempting insert data", 'mesage');
        $response->SetCode(404);
        return;
    }
});

$router->post('/' . $context . '/edit', function(Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'slug' ])) throw new FewArgumentsException;
    $controller = new CurrencyController();

    $currency = $controller->GetCurrencyBySlug($request->data['slug']);

    if(isset($request->data['name'])) {
        $currency->name = $request->data['name'];
    }

    if(isset($request->data['slug'])) {
        $currency->slug = $request->data['slug'];
    }


    if($controller->Edit($currency)) {
        $response->AppendData("The currency '" . $currency->name . "' was sucessfully created", 'message');
        $response->SetCode(201);
        return;
    } else {
        $response->AppendData("An error ocurred attempting insert data", 'mesage');
        $response->SetCode(404);
        return;
    }
});

$router->get('/' . $context . '/delete', function(Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'slug' ])) throw new FewArgumentsException;
    $controller = new CurrencyController();

    $currency = $controller->GetCurrencyBySlug($request->data['slug']);

    if($controller->Delete($currency)) {
        $response->AppendData("The currency '" . $currency->name . "' was sucessfully deleted", 'message');
        $response->SetCode(200);
        return;
    } else {
        $response->AppendData("An error ocurred attempting delete data", 'mesage');
        $response->SetCode(500);
        return;
    }
});