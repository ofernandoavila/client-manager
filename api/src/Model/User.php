<?php

namespace Avilamidia\ClientManager\Model;

use Avilamidia\ClientManager\Core\Model;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\PrePersist;
use Avilamidia\ClientManager\Repository\UserRepository;

#[Entity, HasLifecycleCallbacks]
class User extends Model {

    #[Column, GeneratedValue, Id]
    public int $id;

    #[Column]
    public string $username;

    #[Column]
    private string $password;
    
    #[Column]
    public string $name;

    #[Column]
    public string $email;

    #[Column]
    public string $userHash;

    #[OneToMany(targetEntity: Session::class, mappedBy: 'user')]
    private $sessions;

    public function __construct(string $user, string $password)
    {
        $this->username = $user;
        $this->password = password_hash($password, PASSWORD_ARGON2I);

        parent::__construct(new UserRepository());
    }

    #[PrePersist]
    public function setUserHash() {
        $this->userHash = sha1(uniqid(mt_rand(), true));
    }
    public function GetPassword() {
        return $this->password;
    }
}