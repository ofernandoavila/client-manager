<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\PrePersist;

#[Entity, HasLifecycleCallbacks]
class Preference {
    #[Column, GeneratedValue, Id]
    public int $id;

    #[Column]
    public string $name;

    #[Column]
    public string $value;

    #[Column]
    public string $slug;

    #[Column]
    public bool $isFromSystem;

    #[Column]
    public string $initialValue;

    #[PrePersist]
    public function setPreferenceslug() {
        $slug = str_replace(" ", "-", strtolower($this->name));
        $this->slug = $slug;
    }

    #[PrePersist]
    public function setInitialValue() {
        $this->initialValue = $this->value;
    }
}