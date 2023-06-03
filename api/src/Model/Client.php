<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;

#[Entity]
class Client {
    #[Column, GeneratedValue, Id]
    public int $id;

    #[Column]
    public string $name;
    
    #[Column(nullable: true)]
    public ?string $email;
    
    #[Column]
    public string $phone;
    
    #[Column]
    public string $address;
    
    #[Column]
    public string $city;
    
    #[Column]
    public string $state;
    
    #[Column]
    public string $zip;
}