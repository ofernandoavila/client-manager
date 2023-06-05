<?php

namespace Avilamidia\ClientManager\Repository;
use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\User;


class UserRepository extends Repository {
    public function __construct()
    {
        parent::__construct(User::class);
    }
}