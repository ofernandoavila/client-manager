<?php

namespace Avilamidia\ClientManager\Exception;
use Avilamidia\ClientManager\Model\Preference;

class MissingSystemPreferenceException extends \Exception {
    public function __construct(array $preference) {
        global $labels;

        $message = $labels["Exception"]["MissingSystemPreference"]["message"];

        parent::__construct(sprintf($message, $preference['name']), 500);
    }
}