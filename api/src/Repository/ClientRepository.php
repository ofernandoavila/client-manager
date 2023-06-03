<?php

namespace Avilamidia\ClientManager\Repository;
use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\Client;

class ClientRepository extends Repository {
    public function __construct() {
        parent::__construct(Client::class);
    }
}