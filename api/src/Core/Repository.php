<?php

namespace Avilamidia\ClientManager\Core;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Exception;
use Avilamidia\ClientManager\Helper\EntityManagerCreator;

class Repository
{
    public string $repository;
    public ?EntityManager $entityManager = null;

    public function __construct(
        string $repositoryName
    ) {
        global $em;
        
        $this->entityManager = $em;
        $this->repository = $repositoryName;
    }

    public function save(object $obj)
    {
        try {
            $this->entityManager->persist($obj);
            $this->entityManager->flush();

            return true;
        } catch(Exception $error) {
            $_SESSION['msg']['type'] = "danger";
            $_SESSION['msg']['text'] = $error->getMessage();
            throw $error;
        }
    }

    public function getCollectionBy(string $property, mixed $value) {
        return $this->entityManager->getRepository($this->repository)->findBy([$property => $value]);
    }

    public function getBy(string $property, mixed $value) {
        return $this->entityManager->getRepository($this->repository)->findOneBy([$property => $value]);
    }

    public function get($id)
    {
        return $this->entityManager->getRepository($this->repository)->find($id);
    }

    public function getAll()
    {
        return $this->entityManager->getRepository($this->repository)->findAll();
    }

    public function update(object $obj):bool
    {
        try {
            $this->entityManager->flush();

            return true;
        } catch (Exception $error) {
            $_SESSION['msg']['type'] = "danger";
            $_SESSION['msg']['text'] = $error->getMessage();
            throw $error;
        }
    }

    public function removeCollection($collection) {
        try {
            foreach ($collection as $item) {
                $item = $this->entityManager->find(get_class($item), $item->id);

                $this->entityManager->remove($item);
            }

            return $this->entityManager->flush();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function remove(object $obj) {
        try {
            $obj = $this->entityManager->getRepository($this->repository)->find($obj->id);

            $this->entityManager->remove($obj);
            $this->entityManager->flush();

            return true;
        } catch(Exception $error) {
            throw $error;
        }
    }
}