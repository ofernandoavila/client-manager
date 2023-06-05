<?php

namespace Avilamidia\ClientManager\Controller;

#region imports
use Avilamidia\ClientManager\Core\Controller;
use Avilamidia\ClientManager\Model\User;
use Avilamidia\ClientManager\Repository\UserRepository;
#endregion

class UserController extends Controller {
    public function __construct() {
        parent::__construct(new UserRepository());
    }

    #region Save User
    public function SaveUser(User $user) {
        return $this->repository->save($user);
    }
    #endregion

    #region Edit User
    public function EditUser(User $user) {
        $userToEdit = $this->GetUserByHash($user->userHash);

        foreach(get_object_vars($userToEdit) as $key => $value) {
            if ($user->$key != '' && $user->$key != $userToEdit->$key) {
                $userToEdit->$key = $user->$key;
            }
        }

        return $this->repository->update($userToEdit);
    }
    #endregion

    #region Delete User
    public function DeleteUser(User $user)
    {
        return $this->repository->remove($user);
    }
    #endregion

    #region Get User functions
    public function GetUserByID(int $id)
    {
        $repo = new UserRepository();
        $user = $repo->get($id);

        return $user;
    }

    public function GetUserByUsername(string $username): User | null
    {
        $userRepo = new UserRepository();

        $user = $userRepo->getBy('username', $username);
        
        return $user;
    }

    public function GetUserByHash(string $hash): User | null
    {
        $userRepo = new UserRepository();

        $user = $userRepo->getBy('userHash', $hash);
        
        return $user;
    }

    public function GetUserBySessionToken(string $token): User | null {
        $session = SessionController::GetSession($token);

        return $this->GetUserByID($session->user->id);
    }

    #endregion

    #region Check if user exists
    /**
     * Check if the given user exists.
     * @var User $user user to be checked
     * @return bool true if the user exists, false otherwise
     */
    public function CheckIfUserExist(User $user):bool {
        $user = $this->repository->getBy('username',$user->username);
        return $user != null ? true : false;
    }
    #endregion

    public function Authenticate(User $user, string $password):bool {
        return password_verify($password, $user->GetPassword());
    }

    public function GetAllUsers() {
        return $this->repository->getAll();
    }
}