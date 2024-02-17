<?php

$tiki = obtener_tiki();

// Proteger modificación los campos de autentificación sensibles
$tiki->gestor_de_hooks->agregar("tiki.procedimiento.realizar_accion:antes", function ($datos) use ($tiki) {
    $operacion = $tiki->parametros["operacion"];
    $tabla = $tiki->parametros["tabla"];
    $operaciones_protegidas = ["insertar", "actualizar", "eliminar"];
    $tablas_protegidas = ["usuarios", "sesiones"];
    $es_tabla_protegida = in_array($tabla, $tablas_protegidas);
    $es_operacion_protegida = in_array($operacion, $operaciones_protegidas);
    if ($es_tabla_protegida && $es_operacion_protegida) {
        throw new Exception("No se puede «{$operacion}» en la tabla «{$tabla}» mediante la API REST normal");
    }
});

// Proteger acceso a contraseñas y tokens sensibles
$tiki->gestor_de_hooks->agregar("tiki.procedimiento.seleccionar:despues", function (&$datos) use ($tiki) {
    // Proteger modificación los campos de autentificación sensibles
    $operacion = $tiki->parametros["operacion"];
    $tabla = $tiki->parametros["tabla"];
    if ($operacion === "seleccionar" && $tabla === "usuarios") {
        if (isset($datos)) {
            for ($index = 0; $index < sizeof($datos); $index++) {
                unset($datos[$index]['contrasenya']);
                unset($datos[$index]['token_confirmacion']);
                unset($datos[$index]['token_recuperacion']);
            }
        }
    }
    if ($operacion === "seleccionar" && $tabla === "sesiones") {
        if (isset($datos)) {
            for ($index = 0; $index < sizeof($datos); $index++) {
                unset($datos[$index]['token']);
            }
        }
    }
});