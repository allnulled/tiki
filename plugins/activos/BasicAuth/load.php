<?php

$tiki = obtener_tiki();

$tiki->gestor_de_hooks->agregar("tiki.procedimiento.realizar_accion:antes", function() use ($tiki) {
    
});