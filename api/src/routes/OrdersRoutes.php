<?php
use Avilamidia\ClientManager\Controller\ClientController;
use Avilamidia\ClientManager\Controller\OrderController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Model\Order;

global $router;

$router->get('/orders', function (Request $request, Response $response) {
    $controller = new OrderController();

    $orders = $controller->GetAllOrders();

    if ($orders !== null) {
        $response->AppendData($orders, 'orders');
        $response->SetCode(200);
    } else {
        $response->SetCode(404);
        $response->AppendData("No orders founded", 'message');
    }
});

$router->post('/orders/new', function (Request $request, Response $response) {
    $clientController = new ClientController();

    $client = $clientController->GetClientById($request->data['clientId']);
    $order = new Order();

    $order->orderHash = uniqid();
    $order->setClient($client);
    $order->amount = floatval($request->data['amount']);
    $order->paymentType = $request->data['paymentType'];
    $order->shippingMethod = $request->data['shippingMethod'];
    $order->shippingAddress = $request->data['shippingAddress'];
    $order->shippingCity = $request->data['shippingCity'];
    $order->shippingState = $request->data['shippingState'];
    $order->shippingZipCode = $request->data['shippingZipCode'];

    $orderController = new OrderController();

    if($orderController->SaveOrder($order)) {
        $response->AppendData("The order '" . $order->orderHash . "' was created!", 'message');
        $response->AppendData("success", 'status');
        $response->SetCode(201);
    } else {
        $response->AppendData("An error occurred while saving", 'message');
        $response->SetCode(500);
    }
});

$router->patch('/orders/edit', function (Request $request, Response $response) {
    $controller = new OrderController();

    $order = $controller->GetOrderById($request->data['order_id']);

    $order = Map($request->data, Order::class, $order);

    $order->id = $request->data['order_id'];

    if ($order !== null) {
        if ($controller->EditOrder($order)) {
            $current = $controller->GetOrderById(intval($request->data['order_id']));
            $response->AppendData("The oder '" . $current->id . "' was edited!", 'message');
            $response->SetCode(200);
        } else {
            $response->SetCode(500);
            $response->AppendData("An error occurred while saving", 'message');
        }
    } else {
        $response->SetCode(404);
        $response->AppendData("The order was not found", 'message');
    }
});

$router->get('/orders/get', function (Request $request, Response $response) {
    $controller = new OrderController();

    $order = $controller->GetOrderById($request->data['order_id']);

    if ($order !== null) {
        $response->AppendData($order, 'order');
        $response->SetCode(200);
    } else {
        $response->SetCode(404);
        $response->AppendData("The order was not found", 'message');
    }
});

$router->get('/orders/delete', function (Request $request, Response $response) {
    $controller = new OrderController();

    $order = $controller->GetOrderById($request->data['order_id']);

    if ($order !== null) {
        if ($controller->DeleteOrder($order)) {
            $response->AppendData("The order '" . $request->data['order_id'] . "' was deleted!", 'message');
            $response->AppendData("danger", 'status');
            $response->SetCode(200);
        } else {
            $response->SetCode(500);
            $response->AppendData("An error occurred while saving", 'message');
        }
    } else {
        $response->SetCode(404);
        $response->AppendData("The order was not found", 'message');
    }
});