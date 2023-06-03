<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Repository\ClientRepository;

class ClientController extends Controller {
    public function __construct() {
        parent::__construct(new ClientRepository());
    }
}