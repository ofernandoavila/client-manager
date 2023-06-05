<?php
use Avilamidia\ClientManager\Controller\FeatureController;
use Avilamidia\ClientManager\Core\Request;
use Avilamidia\ClientManager\Core\Response;
use Avilamidia\ClientManager\Model\Feature;
use Avilamidia\ClientManager\Model\FeatureAttribute;
use Avilamidia\ClientManager\Model\FeatureItem;

global $router;

$router->get('/features', function (Request $request, Response $response) {

    $controller = new FeatureController();

    $features = $controller->GetAllFeatures();
    
    if($features) {
        $response->AppendData($features, 'features');
        $response->SetCode(200);
    } else {
        $response->AppendData('No features was found', 'message');
        $response->SetCode(500);
    }
});

$router->post('/features/new', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'name' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $feature = new Feature();
    $feature->name = $request->data['name'];

    if(isset($request->data['parentSlug'])) {
        $parent = $controller->GetFeatureBySlug($request->data['parentSlug']);
        $feature->parent = $parent;
    }
    
    if($controller->SaveFeature($feature)) {
        $response->AppendData('Feature saved successfully', 'message');
        $response->SetCode(201);
    } else {
        $response->AppendData('An error ocurred while attempting create feature', 'message');
        $response->SetCode(500);
    }
});

$router->get('/features/delete', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'slug' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $feature = $controller->GetFeatureBySlug($request->data['slug']);
    
    if($controller->DeleteFeature($feature)) {
        $response->AppendData('Feature deleted successfully', 'message');
        $response->SetCode(200);
    } else {
        $response->AppendData('An error ocurred while attempting delete feature', 'message');
        $response->SetCode(500);
    }
});


$router->post('/features/attributes/new', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'name', 'parentSlug' , 'value', 'type' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $parent = $controller->GetFeatureBySlug($request->data['parentSlug']);
    $attribute = new FeatureAttribute($parent);
    $attribute->name = $request->data['name'];
    $attribute->value = $request->data['value'];
    $attribute->type = $request->data['type'];

    if($attribute->type == 'feature') {
        if(!isset($request->data['typeSlug'])) {
            $response->AppendData('Feature slug of type is missing', 'message');
            $response->SetCode(500);
            return;
        }
        
        $attribute->featureType = $controller->GetFeatureBySlug($request->data['typeSlug']);
    }
    
    if($controller->CreateNewFeatureAttribute($attribute)) {
        $response->AppendData('Feature attribute created successfully', 'message');
        $response->SetCode(201);
    } else {
        $response->AppendData('An error ocurred while attempting create feature attribute', 'message');
        $response->SetCode(500);
    }
});

$router->get('/features/attributes', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'parentSlug' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $attributes = $controller->GetAllAttributesFromFeature($controller->GetFeatureBySlug($request->data['parentSlug']));
    
    if($attributes) {
        $response->AppendData($attributes, 'attributes');
        $response->SetCode(200);
    } else {
        $response->AppendData('An error ocurred while attempting create feature attribute', 'message');
        $response->SetCode(500);
    }
});







$router->post('/features/item/new', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'typeSlug', 'item' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $type = $controller->GetFeatureBySlug($request->data['typeSlug']);

    $item = new FeatureItem($type);
    $item->Map($request->data['item']);
    
    if($controller->SaveFeatureItem($item)) {
        $response->AppendData('Feature item created successfully', 'message');
        $response->SetCode(201);
    } else {
        $response->AppendData('An error ocurred while attempting create feature item', 'message');
        $response->SetCode(500);
    }
});

$router->get('/features/items', function (Request $request, Response $response) {
    if(!Request::ValidateRequestFields($request, [ 'typeSlug' ])) {
        $response->AppendData('One or more arguments are missing', 'message');
        $response->SetCode(500);
        return;
    }

    $controller = new FeatureController();

    $feature = $controller->GetFeatureBySlug($request->data['typeSlug']);

    $items = $controller->GetFeatureItemsFromFeature($feature);
    
    if($items) {
        $response->AppendData($items, 'items');
        $response->SetCode(200);
    } else {
        $response->AppendData('An error ocurred while attempting create feature item', 'message');
        $response->SetCode(500);
    }
});