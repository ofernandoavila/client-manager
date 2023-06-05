<?php

namespace Avilamidia\ClientManager\Controller;
use Avilamidia\ClientManager\Model\Preference;

class PreferenceController {
    public static function GetPreferenceBySlug(string $slug) {
        global $em;

        $preference = $em->getRepository(Preference::class)->findOneBy(['slug' => $slug]);

        return $preference;
    }

    public static function GetAllPreferences() {
        global $em;

        $preferences = $em->getRepository(Preference::class)->findAll();

        return $preferences;
    }

    public static function GetAllPreferencesFromSystem() {
        global $em;

        $preferences = $em->getRepository(Preference::class)->findBy(['isFromSystem' => true]);

        return $preferences;
    }

    public static function SavePreference(Preference $preference) {
        global $em;

        $em->persist($preference);
        $em->flush();

        return $preference;
    }

    public static function DeletePreferenceBySlug(string $slug, bool $systemOperations = false) {
        global $em;

        $preference = $em->getRepository(Preference::class)->findOneBy(['slug' => $slug]);

        if(!$systemOperations) {
            if(!$preference->isFromSystem) {
                $em->remove($preference);
                $em->flush();
                return true;
            } else {
                return false;
            }
        } else {
            $em->remove($preference);
            $em->flush();
            return true;
        }
    }

    public static function EditPreferenceBySlug(string $slug, string $value): bool {
        try {
            global $em;

            $preference = $em->getRepository(Preference::class)->findOneBy(['slug' => $slug]);
            $preference->value = $value;

            $em->flush();

            return true;
        } catch(\Exception $e) {
            return false;
        }
    }
}