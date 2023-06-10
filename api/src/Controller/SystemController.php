<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Exception\MissingSystemPreferenceException;
use Avilamidia\ClientManager\Model\Preference;

class SystemController {
    public static function ResetAllPreferences() {
        global $system;

        $preferences = PreferenceController::GetAllPreferences();

        foreach($preferences as $preference) {
            PreferenceController::DeletePreferenceBySlug($preference->slug, true);
        }

        foreach($system->getPreferencesFromSystem() as $systemPreference) {
            $preference = new Preference();
            $preference->name = $systemPreference['name'];
            $preference->value = $systemPreference['value'];
            $preference->slug = $systemPreference['slug'];
            $preference->isFromSystem = $systemPreference['isFromSystem'];

            PreferenceController::SavePreference($preference);
        }

        return true;
    }

    public static function CheckSystemIntegrity() {
        global $system;

        $preferenceController = new PreferenceController();
        foreach($system->getPreferencesFromSystem() as $systemPreference) {
            $preference = $preferenceController->GetPreferenceBySlug($systemPreference['slug']);

            if($preference == null) throw new MissingSystemPreferenceException($systemPreference);
        }

        return true;
    }
}