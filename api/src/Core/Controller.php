<?php

namespace Avilamidia\ClientManager\Core;

class Controller {

    protected Repository $repository;
    protected array $config;

    public function __construct(Repository $repo = null)
    {
        global $configs;
        
        $repo != null ? $this->repository = $repo : '';

        $this->config = $configs;
    }

    
}