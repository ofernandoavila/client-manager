<?php

namespace Avilamidia\ClientManager\Model;
use Avilamidia\ClientManager\Core\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\PrePersist;

#[Entity, HasLifecycleCallbacks]
class Currency {
    #[Column, GeneratedValue, Id]
    public int $id;

    #[Column]
    public string $name;

    #[Column]
    public string $slug;

    #[Column]
    public string $symbol;

    #[Column]
    public bool $isFromSystem;

    #[PrePersist]
    public function setSlug() {
        $this->slug = SlugFormatter($this->name);
    }

    #[PrePersist]
    public function setIsFromSystem() {
        if(!isset($this->isFromSystem)) {
            $this->isFromSystem = false;
        }
    }
}