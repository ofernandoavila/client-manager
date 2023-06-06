<?php

namespace Avilamidia\ClientManager\Repository;

use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\Currency;

class CurrencyRepository extends Repository {
    public function __construct() {
        parent::__construct(Currency::class);
    }
}