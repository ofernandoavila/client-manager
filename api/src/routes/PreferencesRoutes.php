<?php
use Avilamidia\ClientManager\Controller\PreferenceController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Model\Preference;

global $router;

$router->get('/preferences', function(Request $request, Response $response) {
    $preferences = PreferenceController::GetAllPreferences();

    $response->AppendData($preferences, 'preferences');
    $response->SetCode(200);
});

$router->get('/preferences/get', function(Request $request, Response $response) {
    if(!isset($request->data['slug'])) {
        $response->AppendData('One or more arguments are missing!', 'message');
        $response->SetCode(500);
    } 

    $preference = PreferenceController::GetPreferenceBySlug($request->data['slug']);

    if($preference) {
        $response->AppendData($preference, 'preference');
        $response->SetCode(200);
    } else {
        $response->AppendData($preference, 'preference');
        $response->SetCode(500);
    }
});

$router->get('/preferences/delete', function(Request $request, Response $response) {
    if(!isset($request->data['slug'])) {
        $response->AppendData('One or more arguments are missing!', 'message');
        $response->SetCode(500);
    } 

    if(PreferenceController::DeletePreferenceBySlug($request->data['slug'])) {
        $response->AppendData('Preference has been deleted!', 'message');
        $response->SetCode(200);
    } else {
        $response->AppendData('An error ocurred while deleting preference', 'message');
        $response->SetCode(500);
    }
});

$router->post('/preferences/new', function(Request $request, Response $response) {

    if(!isset($request->data['name']) || !isset($request->data['value'])) {
        $response->AppendData('One or more arguments are missing!', 'message');
        $response->SetCode(500);
    } 

    $preference = new Preference();
    $preference->name = $request->data['name'];
    $preference->value = $request->data['value'];

    $saved = PreferenceController::SavePreference($preference);

    if($saved) {
        $response->AppendData($saved, 'preference');
        $response->SetCode(200);
    } else {
        $response->AppendData($saved, 'preference');
        $response->SetCode(500);
    }
});

$router->post('/preferences/edit', function(Request $request, Response $response) {

    if(!isset($request->data['slug']) || !isset($request->data['value'])) {
        $response->AppendData('One or more arguments are missing!', 'message');
        $response->SetCode(500);
    } 

    if(PreferenceController::EditPreferenceBySlug($request->data['slug'], $request->data['value'])) {
        $response->AppendData('Preference changed successfully', 'message');
        $response->SetCode(200);
    } else {
        $response->AppendData('Error attempting to save preference', 'message');
        $response->SetCode(500);
    }
});