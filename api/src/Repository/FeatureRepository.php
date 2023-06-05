<?php

namespace Avilamidia\ClientManager\Repository;

use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\Feature;

class FeatureRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(Feature::class);
    }
}