<?php

namespace Avilamidia\ClientManager\Core;

final class View {
    public string $viewFilePath;
    public array $data;

    public function __construct(string $viewFilePath) {
        $this->viewFilePath = $viewFilePath;
    }
}