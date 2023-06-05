<?php

namespace Avilamidia\ClientManager\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;

#[Entity]
class FeatureItem {
    #[Column, GeneratedValue, Id]
    public int $id;
    #[ManyToOne(targetEntity: Feature::class)]
    #[JoinColumn(name: 'type_id', referencedColumnName: 'id')]
    private Feature $type;
    public Array $attributes;
    public Array $values;
    #[Column(type: 'json')]
    private string $data = "";

    public function __construct(Feature $type) {
        $this->type = $type;
    }

    public function hashData() {
        $this->data = json_encode($this->values);
    }

    public function unHashData() {
        $this->values = json_decode($this->data, true);
    }

    private function formatItem() {
        foreach($this->attributes as $attribute) {
            $this->values[$attribute->slug] = null;
        }
    }

    public function setValue(string $slugAttribute, mixed $value) {
        $this->values[$slugAttribute] = $value;
    }
    public function getValue(string $slugAttribute) {
        return $this->values[$slugAttribute] ?? null;
    }

    public function Map(array $values) {
        foreach($values as $key => $value) {
            $this->values[$key] = $value;
        }
    }
}