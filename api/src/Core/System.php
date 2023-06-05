<?php

namespace Avilamidia\ClientManager\Core;
use Avilamidia\ClientManager\Controller\PreferenceController;
use Avilamidia\ClientManager\Model\Preference;

class System {
    public string $version = '1.0';
    public string $name = 'Avilamidia | Client Manager';
    public array $preferences;

    public function __construct() {
        $this->preferences = PreferenceController::GetAllPreferences();
    }

    public function getPreference(string $name): Preference {
        return $this->preferences[$name];
    }

    public function getPreferencesFromSystem() {
        return [
            [
                'name' => 'Currency', 
                'value' => 'USD$',
                'isFromSystem' => true
            ],
            [
                'name' => 'Corporation Name', 
                'value' => 'Client Manager',
                'isFromSystem' => true
            ],
            [
                'name' => 'Decimal Separator',  
                'value' => '.',
                'isFromSystem' => true
            ]
        ];
    }
}