<?php

function Map($data, $targetEntity, $currentObject = null) :object {
    $entity = $currentObject ?? new $targetEntity;
    foreach ($data as $key => $value) {
        if (property_exists($entity, $key)) {
            $entity->$key = $value;
        }
    }

    return $entity;
}