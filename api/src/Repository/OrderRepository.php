<?php

namespace Avilamidia\ClientManager\Repository;

use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\Order;

class OrderRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Order::class);
    }
}