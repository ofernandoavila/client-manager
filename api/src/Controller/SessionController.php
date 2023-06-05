<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Model\Session;
use Avilamidia\ClientManager\Model\User;

class SessionController {
    public static function SaveSession(User $user): string {
        global $em;

        $session = new Session();
        $session->setUser($user);
        
        $em->persist($session);
        $em->flush();

        return $session->hash;
    }

    public static function GetSession(string $sessionToken): Session {
        global $em;

        $session = $em->getRepository(Session::class)->findOneBy(['hash' => $sessionToken]);

        return $session;
    }

    public static function DestroySession(string $sessionToken):bool {
        global $em;

        $session = SessionController::GetSession($sessionToken);

        if ($session) {
            $em->remove($session);
            $em->flush();

            return true;
        } else {
            return false;
        }
    }

    public static function GetSessionByUser(User $user):Session 
    {
        global $em;

        $session = $em->getRepository(Session::class)->findOneBy(['user' => $user]);

        return $session;
    }

    public static function RenewSession(string $sessionToken):Session {
        global $em;

        $session = SessionController::GetSession($sessionToken);

        if ($session) {
            $session->renewExpirationDate();
            $session->renewSessionHash();
            $em->flush();

        }

        return $session;
    }
}