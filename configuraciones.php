<?php

// SECCION 1. QUE IMPRIMA EERRORES PESE A TODO:

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// SECCION 2. CABECERAS CORS:

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// SECCION 3. MÉTODO OPTIONS:

if($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    die();
}

// SECCION 4. POLYFILAS:

if (!function_exists('apache_get_headers')) {
    function apache_get_headers()
    {
        $cabeceras = [];
        foreach ($_SERVER as $clave => $valor) {
            if (substr($clave, 0, 5) == 'HTTP_') {
                $cabeceraClave = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($clave, 5)))));
                $cabeceras[$cabeceraClave] = $valor;
            }
        }
        return $cabeceras;
    }
}

// SECCION 5. CONFIGURACIONES GLOBALES:

global $_CONFIGURACIONES;
$_CONFIGURACIONES = array();
$_CONFIGURACIONES["environment"] = "test";
$_CONFIGURACIONES["database_host"] = "127.0.0.1";
$_CONFIGURACIONES["database_user"] = "root";
$_CONFIGURACIONES["database_password"] = "";
$_CONFIGURACIONES["database_name"] = "example2";

// SECCION 6. POLÍTICA DE SEGURIDAD ESTRICTA:

global $_POLITICA_DE_SEGURIDAD_ESTRICTA;
$_POLITICA_DE_SEGURIDAD_ESTRICTA = [
    "safe_tables" => [
        // None is totally forbidden.
    ],
    "safe_columns" => [
        // Some columns must be untraceable:
        "usuarios.contrasenya",
        "usuarios.token_de_confirmacion",
        "usuarios.token_de_recuperacion",
        "sesiones.token",
    ]
];