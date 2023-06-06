<?php

namespace Avilamidia\ClientManager\Core;

class Controller {

    protected Repository $repository;
    protected array $config;

    public function __construct(Repository $repo = null)
    {
        global $configs;
        
        $repo != null ? $this->repository = $repo : '';

        $this->config = $configs;
    }

    public function Save(object $object):bool {
        return $this->repository->save($object);
    }

    public function Edit(object $object):bool {
        return $this->repository->update($object);
    }

    public function Delete(object $object):bool {
        return $this->repository->remove($object);
    }

    public function Get(object $object):object {
        return $this->repository->get($object->id);
    }

    public function GetAll():array {
        return $this->repository->getAll();
    }
}