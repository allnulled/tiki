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

// SECCION 6. METAESQUEMA: ATRIBUTOS DEL ESQUEMA DE DATOS

global $_METAESQUEMA;
$_METAESQUEMA = [
    "usuario.email" => [
        "is_identity" => true,
        "is_form_type" => "email"
    ],
    "usuario.contrasenya" => [
        "is_form_type" => "contraseña",
        "is_private_column" => true
    ],
    "usuario.token_confirmacion" => [
        "is_form_type" => "contraseña",
        "is_private_column" => true
    ],
    "usuario.token_recuperacion" => [
        "is_form_type" => "contraseña",
        "is_private_column" => true
    ],
    "grupo.nombre" => [
        "is_identity" => true
    ],
    "permiso.nombre" => [
        "is_identity" => true
    ],
    "sesion.token" => [
        "is_form_type" => "contraseña",
        "is_private_column" => true
    ],
    "nota.fecha_de_expiracion"=> [
        "is_form_type" => "fecha"
    ],
    "nota.esta_destacado" => [
        "is_form_type" => "booleano combobox",
        "has_options" => ["Normal", "Destacado"]
    ],
    "nota.prioridad" => [
        "is_form_type" => "booleano checkbox",
        "has_options" => ["¡Prioritario!", "¿Prioritario?"]
    ],
    "nota.clasificacion" => [
        "is_form_type" => "opción selector",
        "has_options" => ["Observación", "Comentario constructivo", "Crítica", "Mensaje público", "Mensaje al administrador"]
    ],
    "nota.modo" => [
        "is_form_type" => "opción combobox",
        "has_options" => ["A tiempo", "Puede posponerse", "Urgente"]
    ],
    "nota.tags_principales" => [
        "is_form_type" => "opciones checkbox",
        "has_options" => ["Sobre la plataforma", "Sobre alguna conducta", "Sobre la organización"]
    ]
];
