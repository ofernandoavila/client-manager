<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Model\Preference;

class SystemController {
    public static function ResetAllPreferences() {
        global $system;

        $preferences = PreferenceController::GetAllPreferences();

        foreach($preferences as $preference) {
            PreferenceController::DeletePreferenceBySlug($preference, true);
        }

        foreach($system->getPreferencesFromSystem() as $systemPreference) {
            $preference = new Preference();
            $preference->name = $systemPreference['name'];
            $preference->value = $systemPreference['value'];
            $preference->isFromSystem = $systemPreference['isFromSystem'];

            PreferenceController::SavePreference($preference);
        }

        return true;
    }
}