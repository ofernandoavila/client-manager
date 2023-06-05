<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\PrePersist;

#[Entity, HasLifecycleCallbacks]
class Session {
    #[Column, GeneratedValue, Id]
    public int $id;

    #[ManyToOne(targetEntity: User::class, inversedBy: 'sessions', fetch: 'EAGER')]
    public User $user;

    #[Column]
    public string $hash;

    #[Column(type: 'datetime')]
    public $expirationDate;

    #[PrePersist]
    public function setExpirationDate(): void
    {
        $currentDate = new \DateTime();
        $expirationDate = $currentDate->modify('+7 days');
        $this->expirationDate = $expirationDate;
    }

    #[PrePersist]
    public function setSessionHash() {
        $this->hash = sha1(uniqid(mt_rand(), true));
    }

    public function setUser(User $user) {
        $this->user = $user;
    }

    public function renewExpirationDate(): void {
        $currentExpirationDate = $this->expirationDate;
        $newExpirationDate = $currentExpirationDate->modify('+7 days');
        $this->expirationDate = $newExpirationDate;
    }

    public function renewSessionHash(): void {
        $this->hash = sha1(uniqid(mt_rand(), true));
    }
}