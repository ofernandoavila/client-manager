<?php

namespace Avilamidia\ClientManager\Core;
use Exception;
use Avilamidia\ClientManager\Model\File;

abstract class FileManager {
    public static function CreateDirectory(string $directory) {
        global $configs;

        if (!is_dir($configs['storage_dir'] . '/' . $directory)) {
            return mkdir($configs['storage_dir'] . '/' . $directory, 0777, true);
        } else {
            throw new Exception('Directory already exists: ' . $directory);
        }
    }

    public static function CheckIfFileExists(string $filePath) {
        global $configs;

        return file_exists($configs['storage_dir'] . $filePath);
    }

    public static function UpdateFile(File $file, string $path) {
        try {
            if(rename($file->GetFile(), $path)) {
                chmod($path, 0777);
                return true;
            }
        } catch(Exception $e) {
            throw $e;
        }
    }
}