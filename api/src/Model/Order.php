<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\Table;

#[Entity]
#[Table(name: "orders")]
class Order {
    #[Column, GeneratedValue, Id]
    public int $id;

    #[ManyToOne(targetEntity: Client::class, inversedBy: 'orders', fetch: 'EAGER')]
    public Client $client;

    #[Column]
    public float $amount;

    #[Column(nullable: true)]
    public string $status;
    
    #[Column]
    public string $paymentType;

    #[Column(nullable: true)]
    public string $paymentStatus;

    #[Column]
    public string $shippingMethod;

    #[Column(nullable: true)]
    public string $shippingStatus;

    #[Column]
    public string $shippingAddress;

    #[Column]
    public string $shippingCity;

    #[Column]
    public string $shippingState;

    #[Column]
    public string $shippingZipCode;
    
    #[Column]
    public string $orderHash;

    public function setClient(Client $client) {
        $this->client = $client;
    }
}