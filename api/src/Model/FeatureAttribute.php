<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\PrePersist;

#[Entity, HasLifecycleCallbacks]
class FeatureAttribute {
    #[Column, GeneratedValue, Id]
    public int $id;
    #[Column]
    public string $name;
    #[Column]
    public string $value;
    #[Column]
    public string $type;
    #[Column]
    public string $slug;
    #[ManyToOne( targetEntity: Feature::class , inversedBy: 'attributes')]
    public Feature $parent;

    #[ManyToOne(targetEntity: Feature::class)]
    #[JoinColumn(name: 'type_id', referencedColumnName: 'id', nullable: true)]
    public Feature $featureType;

    public function __construct(Feature $parent) {
        $this->parent = $parent;
    }

    #[PrePersist]
    public function setSlug() {
        $this->slug = SlugFormatter($this->name);
    }
}