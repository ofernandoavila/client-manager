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

    public function DeleteClient(Client $client): bool
    {
        return $this->repository->remove($client);
    }

    public function GetClientById(int $id):Client | null {
        return $this->repository->get($id);
    }

    public function EditClient(Client $client): bool {
        if (!isset($client->id))
            throw new Exception('The client id is required for this operation');

        $clientToEdit = $this->GetClientById($client->id);

        if($client->name != '' && $client->name != $clientToEdit->name) {
            $clientToEdit->name = $client->name;
        }

        if ($client->email != '' && $client->email != $clientToEdit->email) {
            $clientToEdit->email = $client->email;
        }

        if ($client->phone != '' && $client->phone != $clientToEdit->phone) {
            $clientToEdit->phone = $client->phone;
        }

        if ($client->address != '' && $client->address != $clientToEdit->address) {
            $clientToEdit->address = $client->address;
        }

        if ($client->city != '' && $client->city != $clientToEdit->city) {
            $clientToEdit->city = $client->city;
        }

        if ($client->state != '' && $client->state != $clientToEdit->state) {
            $clientToEdit->state = $client->state;
        }

        if ($client->zip != '' && $client->zip != $clientToEdit->zip) {
            $clientToEdit->zip = $client->zip;
        }

        return $this->repository->update($clientToEdit);
    }
}