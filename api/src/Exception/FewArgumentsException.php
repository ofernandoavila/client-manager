<?php

namespace Avilamidia\ClientManager\Exception;

class FewArgumentsException extends \Exception {
    public function __construct() {
        parent::__construct( 'Some arguments are missing, please check again your request!', 100 );
    }

}