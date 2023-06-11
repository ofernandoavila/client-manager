<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\OneToOne;
use Doctrine\ORM\Mapping\PrePersist;

#[Entity, HasLifecycleCallbacks]
class Feature {
    #[Column, GeneratedValue, Id]
    public int $id;
    #[Column]
    public string $name;
    #[Column]
    public string $slug;

    #[ManyToOne(targetEntity: Feature::class)]
    #[JoinColumn(name: 'parent_id', referencedColumnName: 'id', nullable: true)]
    public Feature $parent;

    #[OneToMany( targetEntity: FeatureAttribute::class, mappedBy: "parent")]
    private $attributes;
    private $data;
    #[Column]
    public bool $displayOnTopMenu;
    #[Column]
    public bool $displayAsConfigurationTab;

    public function __construct() {
    }

    #[PrePersist]
    public function setSlug() {
        $this->slug = SlugFormatter($this->name);
    }

    #[PrePersist]
    public function setConfigsOptions()
    {
        $this->displayOnTopMenu = false;
        $this->displayAsConfigurationTab = false;
    }

    public function getAttributes() {
        return $this->attributes;
    }

    public function getData() {
        return $this->data;
    }
}