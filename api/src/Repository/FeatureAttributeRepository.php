<?php

namespace Avilamidia\ClientManager\Repository;

use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\FeatureAttribute;

class FeatureAttributeRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(FeatureAttribute::class);
    }
}