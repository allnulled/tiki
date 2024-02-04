<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

if($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    die();
}

global $_CONFIGURACIONES;
$_CONFIGURACIONES = array();
$_CONFIGURACIONES["environment"] = "test";
$_CONFIGURACIONES["database_host"] = "127.0.0.1";
$_CONFIGURACIONES["database_user"] = "root";
$_CONFIGURACIONES["database_password"] = "";
$_CONFIGURACIONES["database_name"] = "example2";

