<?php

namespace Avilamidia\ClientManager\Model;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;

#[Entity]
class Client
{
    #[Column, GeneratedValue, Id]
    public int $id;

    #[Column]
    public string $name;

    #[Column(nullable: true)]
    public ?string $email;

    #[Column]
    public string $phone;

    #[Column(nullable: true)]
    public string $address;

    #[Column(nullable: true)]
    public string $city;

    #[Column(nullable: true)]
    public string $state;

    #[Column(nullable: true)]
    public string $zip;

    #[OneToMany(targetEntity: Order::class, mappedBy: 'client')]
    public $orders;
}