<?php

namespace Avilamidia\ClientManager\Repository;

use Avilamidia\ClientManager\Core\Repository;
use Avilamidia\ClientManager\Model\FeatureItem;

class FeatureItemRepository extends Repository
{
    public function __construct()
    {
        parent::__construct(FeatureItem::class);
    }
}