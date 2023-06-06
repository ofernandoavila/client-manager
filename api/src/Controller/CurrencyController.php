<?php

namespace Avilamidia\ClientManager\Controller;

use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Repository\CurrencyRepository;

class CurrencyController extends Controller {
    public function __construct() {
        parent::__construct(new CurrencyRepository());
    }

    public function GetCurrencies() {
        return $this->repository->getAll();
    }

    public function GetCurrencyBySlug(string $slug) {
        return $this->repository->getBy('slug', $slug);
    }
}