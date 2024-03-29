<?php

try {

    require("configuraciones.php");

    global $_TIKI;
    global $_NODATA;
    $_NODATA = [];

    function obtener_tiki()
    {
        global $_TIKI;
        return $_TIKI;
    }

    class GestorDeHooks
    {
        private $hooks = [];
        public function agregar($nombre, $callback, $prioridad = 0)
        {
            if (!isset($this->hooks[$nombre])) {
                $this->hooks[$nombre] = [];
            }
            $this->hooks[$nombre][] = ['callback' => $callback, 'prioridad' => $prioridad];
            // Ordenar los hooks por prioridad (de menor a mayor)
            usort($this->hooks[$nombre], function ($a, $b) {
                return $a['prioridad'] - $b['prioridad'];
            });
        }
        public function ejecutar($nombre, &$datos)
        {
            if (isset($this->hooks[$nombre])) {
                foreach ($this->hooks[$nombre] as $hook) {
                    $hook_callback = $hook['callback'];
                    $hook_callback($datos);
                }
            }
        }
    }

    class TikiFramework
    {
        public $gestor_de_hooks = null;
        public $parametros = array();
        function __construct()
        {
            $this->gestor_de_hooks = new GestorDeHooks();
            $cuerpo = file_get_contents("php://input");
            $this->parametros = array_merge($_GET, $_POST, json_decode(empty($cuerpo) ? "{}" : $cuerpo, true));
        }
        function cargar_plugins()
        {
            $plugins_activos = scandir("./plugins/activos");
            foreach ($plugins_activos as $plugin_name) {
                if ($plugin_name == "." || $plugin_name == "..") {
                    continue;
                }
                $plugin_loader_file = "./plugins/activos/{$plugin_name}/load.php";
                include($plugin_loader_file);
            }
        }
        function formatear_a_json($data)
        {
            return json_encode($data, JSON_UNESCAPED_UNICODE);
        }
        function loguear_evento($mensaje, $archivo = "log.txt", $tamanioMaximo = 1024 * 1024)
        {
            global $_CONFIGURACIONES;
            if ($archivo == "trace.txt") {
                if ($_CONFIGURACIONES["environment"] !== "test") {
                    return;
                }
                // Comentar esta línea para tener un trace.txt:
                return;
            }
            // Obtener la ruta completa del archivo
            $rutaCompleta = dirname(__FILE__) . '/logs/' . $archivo;
            if (!is_string($archivo)) {
                throw new Error("El archivo no está especificado");
            }
            // Verificar si el archivo excede el tamaño máximo
            if (file_exists($rutaCompleta) && filesize($rutaCompleta) > $tamanioMaximo) {
                // Rotar el archivo renombrándolo con un timestamp
                $nuevaRuta = dirname(__FILE__) . '/logs/' . str_replace(".txt", "", $archivo) . "_" . time() . '.txt';
                rename($rutaCompleta, $nuevaRuta);
            }
            // Formatear el mensaje con la fecha y hora
            $mensajeFormateado = date('Y-m-d H:i:s') . ': ' . $mensaje . PHP_EOL;
            // Escribir el mensaje en el archivo
            file_put_contents($rutaCompleta, $mensajeFormateado, FILE_APPEND);
        }
        function generar_token($longitud = 20)
        {
            $this->loguear_evento("[actor=generar_token]", "trace.txt");
            return bin2hex(random_bytes($longitud));
        }

        function enviar_correo($destinatario, $asunto, $mensaje)
        {
            $this->loguear_evento("[actor=enviar_correo]", "trace.txt");
            // Aquí puedes implementar el código para enviar correos electrónicos utilizando Gmail u otro servicio.
            return mail($destinatario, $asunto, $mensaje);
        }

        function gestionar_error($mensaje)
        {
            $this->loguear_evento("[actor=gestionar_error]", "trace.txt");
            echo $this->formatear_a_json(array("error" => $mensaje));
            exit();
        }

        function conectar_bd()
        {
            global $_CONFIGURACIONES;
            $this->loguear_evento("[actor=conectar_bd]", "trace.txt");
            $servername = $_CONFIGURACIONES["database_host"];
            $username = $_CONFIGURACIONES["database_user"];
            $contrasenya = $_CONFIGURACIONES["database_password"];
            $dbname = $_CONFIGURACIONES["database_name"];
            $conn = new mysqli($servername, $username, $contrasenya, $dbname);
            if ($conn->connect_error) {
                $this->gestionar_error("Error de conexión a la base de datos: " . $conn->connect_error);
            }
            return $conn;
        }

        function formatear_datos_de_sesion($datos_de_sesion)
        {
            $this->loguear_evento("[actor=formatear_datos_de_sesion]", "trace.txt");
            $usuario_formateado = null;
            for ($i = 0; $i < count($datos_de_sesion); $i++) {
                $fila = $datos_de_sesion[$i];
                if (!isset($usuario_formateado)) {
                    $usuario_formateado = array(
                        "id" => $fila["usuario.id"],
                        "email" => $fila["usuario.email"],
                        "grupo" => [],
                        "permiso" => []
                    );
                }
                $id_grupo = $fila["grupo.id"];
                $id_permiso = $fila["permiso.id"];
                if (isset($id_grupo)) {
                    $usuario_formateado["grupo"][$id_grupo] = array(
                        "id" => $id_grupo,
                        "nombre" => $fila["grupo.nombre"]
                    );
                }
                if (isset($id_permiso)) {
                    $usuario_formateado["permiso"][$id_permiso] = array(
                        "id" => $id_permiso,
                        "nombre" => $fila["permiso.nombre"]
                    );
                }
            }
            return $usuario_formateado;
        }

        function autenticar_usuario($token)
        {
            $this->loguear_evento("[actor=autenticar_usuario]", "trace.txt");
            $conn = $this->conectar_bd();
            $token_sanitized = $conn->real_escape_string($token);
            $query = <<<SQL
            SELECT
                u.id AS 'usuario.id',
                u.email AS 'usuario.email',
                g.id AS 'grupo.id',
                g.nombre AS 'grupo.nombre',
                p.id AS 'permiso.id',
                p.nombre AS 'permiso.nombre',
                gp.id AS 'grupo_y_permiso.id'
            FROM
                sesion s
            JOIN
                usuario u ON s.id_usuario = u.id
            LEFT JOIN
                usuario_y_grupo ug ON u.id = ug.id_usuario
            LEFT JOIN
                grupo g ON ug.id_grupo = g.id
            LEFT JOIN
                grupo_y_permiso gp ON g.id = gp.id_grupo
            LEFT JOIN
                permiso p ON u.id = p.id
            WHERE s.token = '$token_sanitized';
        SQL;
            $result = $conn->query($query);
            if ($result->num_rows > 0) {
                $datos_de_sesion = $result->fetch_all(MYSQLI_ASSOC);
                return $this->formatear_datos_de_sesion($datos_de_sesion);
            } else {
                return null;
            }
        }

        function autorizar_operacion($datos_de_sesion, $operacion, $tabla)
        {
            $this->loguear_evento("[actor=autorizar_operacion]", "trace.txt");
            // @TODO
        }

        function obtener_esquema()
        {
            global $_CONFIGURACIONES;
            $conn = $this->conectar_bd();
            // Consulta para obtener información sobre las tablas y sus columnas
            $query = <<<SQL
            SELECT
                t.TABLE_NAME AS table_name,
                c.COLUMN_NAME AS column_name,
                c.DATA_TYPE AS data_type,
                c.COLUMN_KEY AS column_key,
                c.IS_NULLABLE AS is_nullable,
                c.COLUMN_DEFAULT AS column_default,
                c.EXTRA AS extra,
                kcu.CONSTRAINT_NAME AS constraint_name,
                kcu.REFERENCED_TABLE_NAME AS referenced_table_name,
                kcu.REFERENCED_COLUMN_NAME AS referenced_column_name
            FROM
                information_schema.TABLES t
            LEFT JOIN
                information_schema.COLUMNS c ON t.TABLE_NAME = c.TABLE_NAME AND c.TABLE_SCHEMA = t.TABLE_SCHEMA
            LEFT JOIN
                information_schema.KEY_COLUMN_USAGE kcu ON t.TABLE_NAME = kcu.TABLE_NAME AND c.COLUMN_NAME = kcu.COLUMN_NAME
            WHERE
                t.TABLE_SCHEMA = '${_CONFIGURACIONES["database_name"]}'
        SQL;
            $result = $conn->query($query);
            // Procesar resultados y construir estructura JSON
            $databaseInfo = array();
            while ($row = $result->fetch_assoc()) {
                $table = $row["table_name"];
                $column = array(
                    "name" => $row["column_name"],
                    "type" => $row["data_type"],
                    "key" => $row["column_key"],
                    "nullable" => $row["is_nullable"],
                    "default" => $row["column_default"],
                    "extra" => $row["extra"]
                );
                if (!isset($databaseInfo[$table])) {
                    $databaseInfo[$table] = array(
                        "columns" => array(),
                        "foreign_keys" => array()
                    );
                }
                $databaseInfo[$table]["columns"][] = $column;
                if ($row["constraint_name"] !== null) {
                    $foreign_key = array(
                        "name" => $row["constraint_name"],
                        "source_table" => $row["table_name"],
                        "source_column" => $row["column_name"],
                        "referenced_table" => $row["referenced_table_name"],
                        "referenced_column" => $row["referenced_column_name"]
                    );
                    $databaseInfo[$table]["foreign_keys"][] = $foreign_key;
                    for($index_column = 0; $index_column < count($databaseInfo[$table]["columns"]); $index_column++) {
                        $nombre_1 = $databaseInfo[$table]["columns"][$index_column]["name"];
                        $nombre_2 = $row["column_name"];
                        $nombre_3 = $table;
                        $nombre_4 = $row["table_name"];
                        if(($nombre_2 !== "id") && ($nombre_3 === $nombre_4) && ($nombre_1 === $nombre_2)) {
                            $databaseInfo[$table]["columns"][$index_column] = array_merge($databaseInfo[$table]["columns"][$index_column], [
                                "is_foreign_key_of" => $foreign_key
                            ]);
                        }
                    }
                }
            }
            $this->expandir_esquema($databaseInfo);
            return $databaseInfo;
        }

        function expandir_esquema(&$databaseInfo) {
            global $_METAESQUEMA;
            foreach($_METAESQUEMA as $key => $expansion) {
                $reference = explode(".", $key);
                $table_name = $reference[0];
                $column_name = $reference[1];
                $all_columns = $databaseInfo[$table_name]["columns"];
                for($index = 0; $index < count($all_columns); $index++) {
                    $column = $all_columns[$index];
                    if($column["name"] === $column_name) {
                        $databaseInfo[$table_name]["columns"][$index] = array_merge($column, $expansion);
                    }
                }
            }
        }

        function es_columna_privada($tabla, $columna, $esquema = null) {
            if(is_null($esquema)) {
                $esquema = $this->obtener_esquema();
            }
            try {
                $coincidencias = array_filter($esquema[$tabla]["columns"], function($item) use ($columna) {
                    return ($item["name"] === $columna) && array_key_exists("is_private_column", $item) && ($item["is_private_column"] === true);
                });
                return count($coincidencias) === 1;
            } catch (Exception $ex) {
                return false;
            }
        }

        function esquema()
        {
            $this->loguear_evento("[actor=esquema]", "trace.txt");
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.esquema:antes", $_NODATA);
            $databaseInfo = $this->obtener_esquema();
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.esquema:despues", $databaseInfo);
            echo $this->formatear_a_json($databaseInfo);
        }

        function seleccionar($tabla, $donde = [], $orden = [["id", "ASC"]], $pagina = 1, $items = 20, $busqueda = "")
        {
            global $_CONFIGURACIONES;
            $this->loguear_evento("[actor=seleccionar]", "trace.txt");
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.seleccionar:antes", $_NODATA);
            // Normalizar parametros:
            if(strlen($tabla) === 0) {
                throw new Exception("El parámetro «tabla» debe ser un string para poder «seleccionar»");
            }
            if(is_string($donde)) {
                $donde = json_decode($donde, true);
            }
            if(is_string($orden)) {
                $orden = json_decode($orden, true);
            }
            if(is_string($pagina)) {
                $pagina = (int) $pagina;
            }
            if(is_string($items)) {
                $items = (int) $items;
            }
            if(!is_array($donde)) {
                throw new Exception("El parámetro «donde» debe ser un array para poder «seleccionar»");
            }
            if(!is_array($orden)) {
                throw new Exception("El parámetro «orden» debe ser un array para poder «seleccionar»");
            }
            if(!is_int($pagina)) {
                throw new Exception("El parámetro «pagina» debe ser un integer para poder «seleccionar»");
            }
            if(!is_int($items)) {
                throw new Exception("El parámetro «items» debe ser un integer para poder «seleccionar»");
            }
            // Filtramos los campos seleccionables solamente (que no tengan is_private_column => true):
            $esquema = $this->obtener_esquema();
            if(!array_key_exists($tabla, $esquema)) {
                throw new Exception("No existe la tabla especificada «" . $tabla . "»");
            }
            $campos_array = [];
            foreach($esquema[$tabla]["columns"] as $column_index => $column) {
                $is_private_column = (array_key_exists("is_private_column", $column)) && ($column["is_private_column"] === true);
                if(!$is_private_column) {
                    $campos_array[] = $column["name"];
                }
            }
            $campos = implode(", ", $campos_array);
            // Seguimos con la query:
            $conn = $this->conectar_bd();
            $tabla = $conn->real_escape_string($tabla);
            $operadores_validos = ["<",">","<=",">=","=","!=","IS NULL","IS NOT NULL","LIKE","NOT LIKE","IN","NOT IN"];
            $particula_where = "";
            if (!empty($donde)) {
                $clausulasWhere = [];
                foreach ($donde as $index_filtro => $regla_de_filtro) {
                    $columna = $regla_de_filtro[0] ?? null;
                    if($this->es_columna_privada($tabla, $columna)) {
                        throw new Exception("La columna «{$tabla}.{$columna}» no puede usarse para filtrar");
                    }
                    $operador = $regla_de_filtro[1] ?? null;
                    if(!in_array($operador, $operadores_validos)) {
                        throw new Exception("Operador no válido en «filtro nº {$index_filtro}»");
                    }
                    $valor = $regla_de_filtro[2] ?? null;
                    $columna = $conn->real_escape_string($columna);
                    if(in_array($operador, ["IS NULL", "IS NOT NULL"])) {
                        $clausulasWhere[] = "{$columna} {$operador}";
                    } else if(in_array($operador, ["IN", "NOT IN"])) {
                        if(!is_array($valor)) {
                            throw new Exception("Se requiere de las reglas «donde» con el operador «IN» o «NOT IN» tener un complemento de tipo array");
                        }
                        $valores_sanitizados = [];
                        foreach($valor as $subvalor) {
                            $valores_sanitizados[] = $conn->real_escape_string($subvalor);
                        }
                        $valores_sanitizados = implode(", ", $valores_sanitizados);
                        $clausulasWhere[] = "{$columna} {$operador} ({$valores_sanitizados})";
                    } else {
                        $valor = $conn->real_escape_string($valor);
                        $clausulasWhere[] = "{$columna} {$operador} '{$valor}'";
                    }
                }
                $particula_where = " WHERE " . implode(" AND ", $clausulasWhere);
            } else {
                $particula_where = "";
            }
            if(!empty($busqueda)) {
                if(empty($particula_where)) {
                    $particula_where = " WHERE ";
                }
                $columnas_de_tabla = array_map(function($column) {
                    return $column["name"];
                }, $esquema[$tabla]["columns"]);
                $clausulas_search = [];
                foreach($columnas_de_tabla as $columna_de_tabla) {
                    if(!$this->es_columna_privada($tabla, $columna_de_tabla)) {
                        $busqueda_sanitizada = $conn->real_escape_string($busqueda);
                        $clausula_search = "{$columna_de_tabla} LIKE '%" . $busqueda_sanitizada . "%'";
                        array_push($clausulas_search, $clausula_search);
                    }
                }
                $particula_where .= "(" . implode(" OR ", $clausulas_search) . ")";
            }
            $particula_order_by = "";
            if (!empty($orden)) {
                $clausulasOrder = [];
                foreach ($orden as $regla_de_orden) {
                    $columna = $regla_de_orden[0];
                    if($this->es_columna_privada($tabla, $columna)) {
                        throw new Exception("La columna «{$tabla}.{$columna}» no puede usarse para ordenar");
                    }
                    $columna = $conn->real_escape_string($columna);
                    $direccion = $regla_de_orden[1];
                    if ($direccion !== "ASC" && $direccion !== "DESC") {
                        $direccion = "ASC"; // Por defecto, orden ascendente
                    }
                    $direccion = $conn->real_escape_string($direccion);
                    $clausulasOrder[] = "$columna $direccion";
                }
                $particula_order_by = " ORDER BY " . implode(", ", $clausulasOrder);
            } else {
                $particula_order_by = "";
            }
            $pagina = (int) $pagina;
            $items = (int) $items;
            $offset = ($pagina > 0 ? $pagina - 1 : $pagina) * $items;
            $items = $conn->real_escape_string($items);
            $offset = $conn->real_escape_string($offset);
            $query = "SELECT {$campos} FROM {$tabla} {$particula_where} {$particula_order_by} LIMIT {$items} OFFSET {$offset}";
            $this->loguear_evento($query, "queries.txt");
            $result = $conn->query($query);
            $data = $result->fetch_all(MYSQLI_ASSOC);
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.seleccionar:despues", $data);
            echo $this->formatear_a_json($data);
        }


        function insertar($tabla, $valores)
        {
            $this->loguear_evento("[actor=insertar]", "trace.txt");
            if(!is_array($valores)) {
                throw new Exception("El parámetro «valores» debe ser un array en operación «insert»");
            }
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.insertar:antes", $_NODATA);
            $conn = $this->conectar_bd();
            unset($valores["id"]);
            $framework = $this;
            $valores = array_filter($valores, function($key) use ($framework, $tabla) {
                return !$framework->es_columna_privada($tabla, $key);
            }, ARRAY_FILTER_USE_KEY);
            $valores_sanitized = array_map(function($item) use ($conn) {
                return $conn->real_escape_string($item);
            }, $valores);
            $columnas = implode(',', array_keys($valores_sanitized));
            $valores_str = "'" . implode("','", $valores_sanitized) . "'";
            $query = "INSERT INTO $tabla ($columnas) VALUES ($valores_str)";
            $this->loguear_evento($query, "queries.txt");
            $resultado = $conn->query($query);
            $ultimo_id = $conn->insert_id;
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.insertar:despues", $_NODATA);
            echo $this->formatear_a_json(array(
                "mensaje" => "Registro insertado con éxito.",
                "nuevo_id" => $ultimo_id
            ));
        }

        function actualizar($tabla, $valores, $id)
        {
            $this->loguear_evento("[actor=actualizar]", "trace.txt");
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.actualizar:antes", $_NODATA);
            $conn = $this->conectar_bd();
            unset($valores["id"]);
            $framework = $this;
            $valores = array_filter($valores, function($key) use ($framework, $tabla) {
                return !$framework->es_columna_privada($tabla, $key);
            }, ARRAY_FILTER_USE_KEY);
            $valores_sanitized = array_map(function($item) use ($conn) {
                return $conn->real_escape_string($item);
            }, $valores);
            $set_clause = '';
            foreach ($valores_sanitized as $columna => $valor) {
                $set_clause .= "$columna = '$valor',";
            }
            $set_clause = rtrim($set_clause, ',');
            $query = "UPDATE $tabla SET $set_clause WHERE id = $id";
            $this->loguear_evento($query, "queries.txt");
            $conn->query($query);
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.actualizar:despues", $_NODATA);
            echo $this->formatear_a_json(array("mensaje" => "Registro actualizado con éxito."));
        }

        function eliminar($tabla, $id)
        {
            $this->loguear_evento("[actor=eliminar]", "trace.txt");
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.eliminar:antes", $_NODATA);
            $conn = $this->conectar_bd();
            $query = "DELETE FROM $tabla WHERE id = $id";
            $this->loguear_evento($query, "queries.txt");
            $conn->query($query);
            $this->gestor_de_hooks->ejecutar("tiki.procedimiento.eliminar:despues", $_NODATA);
            echo $this->formatear_a_json(array("mensaje" => "Registro eliminado con éxito."));
        }

        function registrar_usuario($email, $contrasenya)
        {
            global $_CONFIGURACIONES;
            $this->loguear_evento("[actor=registrar_usuario]", "trace.txt");
            $conn = $this->conectar_bd();
            // Verificar si el usuario ya está registrado
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                echo $this->formatear_a_json(array("error" => "El usuario ya está registrado."));
                return;
            }
            // Insertar usuario en la base de datos
            $hash_password = password_hash($contrasenya, PASSWORD_DEFAULT);
            $token = $this->generar_token();
            $token2 = $this->generar_token();
            $stmt = $conn->prepare("INSERT INTO usuario (email, contrasenya, confirmado, token_confirmacion, token_recuperacion) VALUES (?, ?, 0, ?, ?)");
            $stmt->bind_param("ssss", $email, $hash_password, $token, $token2);
            $stmt->execute();
            // Enviar correo de confirmación
            $mensaje = "¡Gracias por registrarte! Para confirmar tu cuenta, haz clic en el siguiente enlace:\n\n";
            $mensaje .= "http://127.0.0.1/tiki/index.php?operacion=confirmar_cuenta&email=$email&token_confirmacion=$token";
            $this->enviar_correo($email, "Confirmación de registro", $mensaje);
            $salida = array(
                "mensaje" => "Te has registrado con éxito. Confirma tu cuenta a través del enlace enviado a tu correo.",
            );
            if ($_CONFIGURACIONES["environment"] == "test") {
                $salida = array_merge(
                    $salida,
                    array(
                        "token_confirmacion" => $token
                    )
                );
            }
            echo $this->formatear_a_json($salida);
        }

        function confirmar_cuenta($email, $token)
        {
            $this->loguear_evento("[actor=confirmar_cuenta]", "trace.txt");
            $conn = $this->conectar_bd();
            // Verificar si el token coincide con el almacenado en la base de datos
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ? AND token_confirmacion = ? AND confirmado = 0");
            $stmt->bind_param("ss", $email, $token);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                // Confirmar la cuenta
                $stmt = $conn->prepare("UPDATE usuario SET confirmado = 1 WHERE email = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                echo $this->formatear_a_json(array("mensaje" => "Tu cuenta ha sido confirmada con éxito."));
            } else {
                echo $this->formatear_a_json(array("error" => "Token de confirmación no válido o cuenta ya confirmada."));
            }
        }

        function iniciar_sesion($email, $contrasenya)
        {
            $this->loguear_evento("[actor=iniciar_sesion]", "trace.txt");
            $conn = $this->conectar_bd();
            // Verificar credenciales
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ? and confirmado = 1");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $usuario = $result->fetch_assoc();
                // Verificar contraseña y cuenta confirmada
                if (password_verify($contrasenya, $usuario['contrasenya'])) {
                    $stmt2 = $conn->prepare('SELECT * FROM sesion WHERE id_usuario = ?');
                    $stmt2->bind_param('s', $usuario["id"]);
                    $stmt2->execute();
                    $result2 = $stmt2->get_result();
                    $token = null;
                    if ($result2->num_rows > 0) {
                        // Devolver sesión si ya hay una abierta
                        $sesion = $result2->fetch_assoc();
                        $token = $sesion["token"];
                    } else {
                        // O crear una sesión nueva
                        $token = $this->generar_token(20);
                        $stmt3 = $conn->prepare('INSERT INTO sesion (id_usuario, token) VALUES (?, ?)');
                        $stmt3->bind_param('ss', $usuario["id"], $token);
                        $stmt3->execute();
                    }
                    echo $this->formatear_a_json(
                        array(
                            "mensaje" => "Inicio de sesión exitoso.",
                            "token_sesion" => $token
                        )
                    );
                } else {
                    echo $this->formatear_a_json(array("error" => "Credenciales no válidas o cuenta no confirmada."));
                }
            } else {
                echo $this->formatear_a_json(array("error" => "Usuario no encontrado."));
            }
        }

        function cerrar_sesion($token)
        {
            $this->loguear_evento("[actor=iniciar_sesion]", "trace.txt");
            $conn = $this->conectar_bd();
            // Cerrar sesión eliminando la información del usuario actual
            $stmt = $conn->prepare("DELETE FROM sesion WHERE token = ?");
            $stmt->bind_param("s", $token);
            $stmt->execute();
            echo $this->formatear_a_json(array("mensaje" => "Sesión cerrada."));
        }

        function olvido_credenciales($email)
        {
            $this->loguear_evento("[actor=olvido_credenciales]", "trace.txt");
            global $_CONFIGURACIONES;
            $conn = $this->conectar_bd();
            // Verificar si el usuario existe y está confirmado
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ? AND confirmado = 1");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                // Generar token de recuperación
                $token = $this->generar_token();
                // Almacenar el token en la base de datos
                $stmt = $conn->prepare("UPDATE usuario SET token_recuperacion = ? WHERE email = ?");
                $stmt->bind_param("ss", $token, $email);
                $stmt->execute();
                // Enviar correo de recuperación
                $mensaje = "Has solicitado restablecer tu contraseña. Para continuar, haz clic en el siguiente enlace:\n\n";
                $mensaje .= "http://127.0.0.1/tiki/index.php?operacion=recuperar_credenciales&email=$email&token_recuperacion=$token";
                $this->enviar_correo($email, "Recuperación de Contraseña", $mensaje);
                $salida = array("mensaje" => "Se ha enviado un correo con instrucciones para recuperar tu contraseña.");
                if ($_CONFIGURACIONES["environment"] == "test") {
                    $salida = array_merge(
                        $salida,
                        array(
                            "token_recuperacion" => $token
                        )
                    );
                }
                echo $this->formatear_a_json($salida);
            } else {
                echo $this->formatear_a_json(array("error" => "Usuario no encontrado o cuenta no confirmada."));
            }
        }

        function recuperar_credenciales($email, $token, $nueva_password)
        {
            $this->loguear_evento("[actor=recuperar_credenciales]", "trace.txt");
            $conn = $this->conectar_bd();
            // Verificar si el token de recuperación coincide con el almacenado en la base de datos
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ? AND token_recuperacion = ? AND confirmado = 1");
            $stmt->bind_param("ss", $email, $token);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                // Cambiar la contraseña del usuario
                $hash_password = password_hash($nueva_password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("UPDATE usuario SET contrasenya = ?, token_recuperacion = NULL WHERE email = ?");
                $stmt->bind_param("ss", $hash_password, $email);
                $stmt->execute();
                echo $this->formatear_a_json(array("mensaje" => "Contraseña recuperada con éxito."));
            } else {
                echo $this->formatear_a_json(array("error" => "Token de recuperación no válido."));
            }
        }

        function baja_del_sistema($id_usuario)
        {
            $this->loguear_evento("[actor=baja_del_sistema]", "trace.txt");
            $conn = $this->conectar_bd();
            // Verificar si el usuario existe y está confirmado
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE id = ?");
            $stmt->bind_param("s", $id_usuario);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                // Eliminar al usuario de sus relaciones y de su tabla en la base de datos
                $stmts = array(
                    "0" => "DELETE FROM usuario_y_grupo WHERE id_usuario = ?",
                    "1" => "DELETE FROM sesion WHERE id_usuario = ?",
                    "2" => "DELETE FROM usuario WHERE id = ?"
                );
                foreach ($stmts as $stmt_index => $stmt) {
                    $stmt = $conn->prepare($stmt);
                    $stmt->bind_param("s", $id_usuario);
                    $stmt->execute();
                }
                echo $this->formatear_a_json(array("mensaje" => "Usuario eliminado con éxito."));
            } else {
                echo $this->formatear_a_json(array("error" => "Usuario no encontrado o cuenta no confirmada."));
            }
        }
    }

    // Iniciamos framework tiki:
    $tiki = new TikiFramework();
    $_TIKI = $tiki;

    $tiki->cargar_plugins();

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.obtener_parametros:antes", $_NODATA);

    // Recibir parámetros
    $token = $tiki->parametros['token'] ?? '';
    $operacion = $tiki->parametros['operacion'] ?? '';
    $tabla = $tiki->parametros['tabla'] ?? '';
    $id = $tiki->parametros['id'] ?? '';
    $valores = $tiki->parametros['valores'] ?? '';

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.obtener_parametros:despues", $_NODATA);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.autenticar_usuario:antes", $_NODATA);

    // Autenticar usuario
    $datos_de_sesion = null;
    $datos_de_sesion = $tiki->autenticar_usuario($token);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.autenticar_usuario:despues", $_NODATA);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.validar_operacion:antes", $_NODATA);

    // Validar operación
    $operaciones_validas = array(
        'esquema',
        'seleccionar',
        'insertar',
        'actualizar',
        'eliminar',
        'registrar_usuario',
        'confirmar_cuenta',
        'iniciar_sesion',
        'cerrar_sesion',
        'olvido_credenciales',
        'recuperar_credenciales',
        'baja_del_sistema'
    );
    $operaciones_crud = array(
        'seleccionar',
        'insertar',
        'actualizar',
        'eliminar'
    );
    if (!in_array($operacion, $operaciones_validas)) {
        $tiki->gestionar_error("Operación no válida.");
    }
    if (in_array($operacion, $operaciones_crud)) {
        // Validar tabla
        $tablas_validas = array(
            'usuario',
            'grupo',
            'permiso',
            'usuario_y_grupo',
            'grupo_y_permiso',
            'sesion',
            'nota'
        );
        if (!in_array($tabla, $tablas_validas)) {
            //$tiki->gestionar_error("Tabla no válida.");
        }
    }

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.validar_operacion:despues", $_NODATA);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.log_de_peticion:antes", $_NODATA);

    // Coger la IP
    $ip = null;
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    $headers = json_encode(apache_get_headers());

    // Persistirlos
    $tiki->loguear_evento("[$ip][$headers]", "log.txt");

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.log_de_peticion:despues", $_NODATA);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.autorizar_peticion:antes", $_NODATA);

    // Autorizar especificamente operación
    $tiki->autorizar_operacion($datos_de_sesion, $operacion, $tabla);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.autorizar_peticion:despues", $_NODATA);

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.realizar_accion:antes", $_NODATA);

    // Ejecutar operación correspondiente
    switch ($operacion) {
        case 'esquema':
            $tiki->esquema();
            break;
        case 'seleccionar':
            $donde = $tiki->parametros["donde"] ?? [];
            $orden = $tiki->parametros["orden"] ?? [];
            $pagina = $tiki->parametros["pagina"] ?? 1;
            $items = $tiki->parametros["items"] ?? 20;
            $busqueda = $tiki->parametros["busqueda"] ?? "";
            $tiki->seleccionar($tabla, $donde, $orden, $pagina, $items, $busqueda);
            break;
        case 'insertar':
            $valores_array = is_string($valores) ? json_decode($valores, true) : $valores;
            $tiki->insertar($tabla, $valores_array);
            break;
        case 'actualizar':
            $valores_array = is_string($valores) ? json_decode($valores, true) : $valores;
            $tiki->actualizar($tabla, $valores_array, $id);
            break;
        case 'eliminar':
            $tiki->eliminar($tabla, $id);
            break;
        case 'registrar_usuario':
            $tiki->registrar_usuario($tiki->parametros["email"] ?? '', $tiki->parametros["contrasenya"] ?? '');
            break;
        case 'confirmar_cuenta':
            $tiki->confirmar_cuenta($tiki->parametros["email"] ?? '', $tiki->parametros["token_confirmacion"] ?? '');
            break;
        case 'iniciar_sesion':
            $tiki->iniciar_sesion($tiki->parametros["email"] ?? '', $tiki->parametros["contrasenya"] ?? '');
            break;
        case 'cerrar_sesion':
            $tiki->cerrar_sesion($tiki->parametros["token"] ?? '');
            break;
        case 'olvido_credenciales':
            $tiki->olvido_credenciales($tiki->parametros["email"] ?? '');
            break;
        case 'recuperar_credenciales':
            $tiki->recuperar_credenciales($tiki->parametros["email"] ?? '', $tiki->parametros["token"] ?? '', $tiki->parametros["contrasenya"] ?? '');
            break;
        case 'baja_del_sistema':
            $tiki->baja_del_sistema($datos_de_sesion["id"]);
            break;
        default:
            $tiki->gestionar_error("Operación no válida (2)");
            break;
    }

    $tiki->gestor_de_hooks->ejecutar("tiki.procedimiento.realizar_accion:despues", $_NODATA);

} catch (Exception $ex) {
    echo json_encode(["error" => $ex->getMessage()], JSON_UNESCAPED_UNICODE);
} ?>