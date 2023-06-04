<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Model\Client;
use Avilamidia\ClientManager\Repository\ClientRepository;
use Exception;

class ClientController extends Controller {
    public function __construct() {
        parent::__construct(new ClientRepository());
    }

    public function SaveClient(Client $client):bool {
        if(!isset($client->name) || !isset($client->phone)) throw new Exception('Client name and phone must be provided');

        return $this->repository->save($client);
    }

    public function GetAllClients() {
        return $this->repository->getAll();
    }

    public function DeleteClient(Client $client): bool
    {
        return $this->repository->remove($client);
    }

    public function GetClientById(mixed $id):Client | null {
        return $this->repository->get($id);
    }

    public function EditClient(Client $client): bool {
        if (!isset($client->id))
            throw new Exception('The client id is required for this operation');

        $clientToEdit = $this->GetClientById($client->id);

        foreach (get_object_vars($clientToEdit) as $key => $value) {
            if (isset($client->$key) && $client->$key != '' && $client->$key != $clientToEdit->$key) {
                $clientToEdit->$key = $client->$key;
            }
        }

        return $this->repository->update($clientToEdit);
    }
}