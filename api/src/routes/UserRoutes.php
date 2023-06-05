<?php

use Avilamidia\ClientManager\Controller\SessionController;
use Avilamidia\ClientManager\Controller\UserController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use \Avilamidia\ClientManager\Model\User;

global $router;

// $router->get('/login', function ($data) {
//     $loginController = new LoginDisplayViewController();

//     return $loginController->LoginPage($data);
// });

// $router->get('/logoff', function ($data) {
//     $loginController = new LoginDisplayViewController();

//     return $loginController->Logoff();
// });

// $router->get('/create-account', function ($data) {
//     $loginController = new LoginDisplayViewController();

//     return $loginController->CreateAccountPage($data);
// });

$router->post('/auth/create-account', function(Request $request, Response $response) {
    $controller = new UserController();

    $user = new User($request->data['username'], $request->data['password']);
    $user->name = $request->data['name'];
    $user->email = filter_var($request->data['email'], FILTER_SANITIZE_EMAIL);

    if ($controller->SaveUser($user)) {
        $response->AppendData("Account created successfully", "message");
        $response->SetCode(201);
    } else {
        $response->AppendData("Error attempting create an account", 'message');
        $response->SetCode(500);
    }
});

$router->post('/auth/login', function(Request $request, Response $response) {

    $controller = new UserController();

    $user = $controller->GetUserByUsername($request->data['username']);
    

    if ($controller->Authenticate($user, $request->data['password'])) {

        $session = SessionController::GetSessionByUser($user) ?? SessionController::SaveSession($user);
        
        if($session) {
            $response->AppendData($session, 'session');
            $response->AppendData(true, 'isLoggedIn');
            $response->AppendData("Account created successfully", "message");
            $response->SetCode(200);
        }
    } else {
        $response->SetCode(403);
        $response->AppendData("Username or password incorrect", 'message');
    }
});

$router->get('/auth', function(Request $request, Response $response) {
    if(!isset($request->data['session_token'])) {
        $response->AppendData("Session token not found",'message');
        $response->SetCode(403);
        return;
    }
    
    $controller = new UserController();

    $user = $controller->GetUserBySessionToken($request->data['session_token']);

    if($user) {
        $response->AppendData($user, 'user');
        $response->AppendData("Account created successfully", "message");
        $response->SetCode(200);
    } else {
        $response->AppendData("Session not found",'message');
        $response->SetCode(404);
    }
});

$router->get('/auth/renew-session', function(Request $request, Response $response) {
    if(!isset($request->data['session_token'])) {
        $response->AppendData("Session token not found",'message');
        $response->SetCode(403);
        return;
    }

    $session = SessionController::RenewSession($request->data['session_token']);

    if($session) {
        $response->AppendData($session, 'session');
        $response->SetCode(200);
    } else {
        $response->AppendData("Session not found",'message');
        $response->SetCode(404);
    }
});

$router->get('/auth/destroy', function(Request $request, Response $response) {
    if(!isset($request->data['session_token'])) {
        $response->AppendData("Session token not found",'message');
        $response->SetCode(403);
        return;
    }

    if(SessionController::DestroySession($request->data['session_token'])) {
        $response->AppendData("Session was destroyed", 'message');
        $response->SetCode(200);
    } else {
        $response->AppendData("Session not found",'message');
        $response->SetCode(404);
    }
});

$router->get('/users', function(Request $request, Response $response) {

    $controller = new UserController();

    $users = $controller->GetAllUsers();

    if($users) {
        $response->AppendData($users, 'users');
        $response->SetCode(200);
    } else {
        $response->AppendData("Users not found");
        $response->SetCode(404);
    }
});

$router->get('/users/get', function(Request $request, Response $response) {

    if(!isset($request->data['userHash'])) {
        $response->AppendData("User hash not found",'message');
        $response->SetCode(403);
        return;
    }

    $controller = new UserController();

    $user = $controller->GetUserByHash($request->data['userHash']);

    if($user) {
        $response->AppendData($user, 'user');
        $response->SetCode(200);
    } else {
        $response->AppendData("Users not found");
        $response->SetCode(404);
    }
});

$router->get('/users/delete', function(Request $request, Response $response) {

    if(!isset($request->data['userHash'])) {
        $response->AppendData("User hash not found",'message');
        $response->SetCode(403);
        return;
    }

    $controller = new UserController();

    $user = $controller->GetUserByHash($request->data['userHash']);
    $username = $user->username;

    if($controller->DeleteUser($user)) {
        $response->AppendData("User '" . $username . "' was deleted!", 'message');
        $response->SetCode(200);
    } else {
        $response->AppendData("Users not found");
        $response->SetCode(404);
    }
});

$router->post('/users/new', function(Request $request, Response $response) {

    if(
        !isset($request->data['username']) || 
        !isset($request->data['password']) ||
        !isset($request->data['name']) ||
        !isset($request->data['email'])
    ) {
        $response->AppendData("One or more arguments are missing",'message');
        $response->SetCode(403);
        return;
    }

    $controller = new UserController();

    $user = new User($request->data['username'], $request->data['password']);
    $user->name = $request->data['name'];
    $user->email = filter_var($request->data['email'], FILTER_SANITIZE_EMAIL);

    if ($controller->SaveUser($user)) {
        $response->AppendData("Account created successfully", "message");
        $response->SetCode(201);
    } else {
        $response->AppendData("Error attempting create an account", 'message');
        $response->SetCode(500);
    }
});

$router->post('/users/edit', function(Request $request, Response $response) {

    if( !isset($request->data['userHash']) ) {
        $response->AppendData("One or more arguments are missing",'message');
        $response->SetCode(403);
        return;
    }

    $controller = new UserController();

    $user = $controller->GetUserByHash($request->data['userHash']);

    $user = Map($request->data, User::class, $user);

    $user->userHash = $request->data['userHash'];

    if ($user !== null) {
        if ($controller->EditUser($user)) {
            $current = $controller->GetUserByHash($request->data['userHash']);
            $response->AppendData("The user '" . $current->userHash . "' was edited!", 'message');
            $response->SetCode(200);
        } else {
            $response->SetCode(500);
            $response->AppendData("An error occurred while saving", 'message');
        }
    } else {
        $response->SetCode(404);
        $response->AppendData("The user was not found", 'message');
    }
});