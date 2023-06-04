<?php

namespace Avilamidia\ClientManager\Controller;

use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Model\Client;
use Avilamidia\ClientManager\Model\Order;
use Avilamidia\ClientManager\Repository\OrderRepository;
use Exception;

class OrderController extends Controller
{
    public function __construct()
    {
        parent::__construct(new OrderRepository());
    }

    public function SaveOrder(Order $order): bool
    {
        if (!isset($order->client) || !isset($order->amount))
            throw new Exception('Client and order amount must be provided');

        return $this->repository->save($order);
    }

    public function DeleteOrder(Order $order): bool
    {
        return $this->repository->remove($order);
    }

    public function GetOrderById(mixed $id): Order | null
    {
        return $this->repository->get($id);
    }

    public function EditOrder(Order $order): bool
    {
        if (!isset($order->id))
            throw new Exception('The order id is required for this operation');

        $orderToEdit = $this->GetOrderById($order->id);

        foreach(get_object_vars($orderToEdit) as $key => $value) {
            if ($order->$key != '' && $order->$key != $orderToEdit->$key) {
                $orderToEdit->$key = $order->$key;
            }
        }

        return $this->repository->update($orderToEdit);
    }

    public function GetAllOrders() {
        return $this->repository->getAll();
    }
}