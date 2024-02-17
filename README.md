![Logo_de_tiki](./test/tiki.png)

El proyecto «tiki» es 1 script que sirve para exponer una base de datos MySQL cualquiera, poblada o no, vía PHP estático pero con autentificación y autorización personalizable.

## Índice

1. Índice
2. Capacidades
3. Instalación
4. Uso
5. Ventajas
6. Desventajas
7. Elaboración
8. Tests
9. Logs
10. Plugins
11. Conclusión

## Capacidades

Las operaciones que se permiten en el sistema son:
- Esquema
- Seleccionar
- Insertar
- Actualizar
- Eliminar
- Registrar usuario
- Confirmar cuenta
- Iniciar sesion
- Cerrar sesion
- Olvido credenciales
- Recuperar credenciales
- Baja del sistema

## Instalación

Ahora explicaré por pasos cómo instalar esta herramienta para poder explotarla.

 - **Paso 1.** Descargar el proyecto de [https://github.com/allnulled/tiki](https://github.com/allnulled/tiki).
 - **Paso 2.** Colocar el proyecto en un servidor para PHP estático, en la carpeta que quieras.
    - Si no tienes uno, mírate [XAMPP](https://www.apachefriends.org/es/download.html) que es lo más fácil de instalar.
 - **Paso 3.** Encender el servidor si no lo está ya, e ir a la URL correspondiente del «index.php». 
    - *Cuidado: puede que si no pones el «index.php» explícito en la URL haga cosas raras, a mí me ha pasado.*
 - **Paso 4.** Ya está, ya tienes la API funcionando. Puedes ir con tu navegador a la URL del «index.php».

## Uso

Una vez instalado `tiki`, ya puedes empezar a hacer peticiones HTTP a la API REST. Pero no vale hacer las peticiones de cualquier manera, sino que hay un protocolo de entendimiento entre las peticiones y el servidor. Esto es lo que se explica a continuación.

Primero, si quieres ver un ejemplo completo del uso de todos los servicios antes listados, puedes ir directamente a [test/test.js](./test/test.js). Ahí tienes un test hecho con `node.js + mocha` que demuestra un uso correcto de la API.

A continuación, describo los campos que se requieren en cada servicio. Hay que tener en cuenta que soporta tanto parámetros GET, POST o POST+JSON. Este último es el más recomendado. Para él, tienes que agregar la cabecera HTTP "Content-Type: application/json" en tus peticiones, y en el cuerpo pasarle directamente un objeto JSON.

El primer término es el que se tiene que pasar al parámetro `operacion`, sea vía GET, POST o POST+JSON. Los términos que aparecen bajo el primero, son otros parámetros de la misma petición que hay que especificar.

Esta es la lista de operaciones:

- **`esquema`:** devuelve el esquema de la base de datos. No tiene parámetros.
- **`seleccionar`:** selecciona datos de una tabla de la base de datos.
   - `tabla`: String. Nombre de la tabla que se selecciona.
- **`insertar`:** inserta un registro en una tabla de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se inserta.
   - `valores`: Object. Los campos con los valores que se insertan.
- **`actualizar`:** actualiza un registro de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se actualiza.
   - `id`: Integer. Campo `id` del registro que se actualiza.
   - `valores`: Object. Los campos con los valores que se actualizan.
- **`eliminar`:** elimina un registro de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se elimina.
   - `id`: Integer. Campo `id` del registro que se elimina.
- **`registrar_usuario`:** registra un usuario en el sistema.
   - `nombre`: String. Nombre del nuevo usuario.
   - `email`: String. Correo electrónico del nuevo usuario.
   - `contrasenya`: String. Contraseña del nuevo usuario.
- **`confirmar_cuenta`:** confirma una cuenta de usuario en el sistema.
   - `email`: String. Correo electrónico del usuario.
   - `token_confirmacion`: String. Token para confirmar la cuenta del usuario.
- **`iniciar_sesion`:** inicia una sesión de usuario en el sistema o devuelve las credenciales de la que haya abierta.
   - `email`: String. Correo electrónico del usuario.
   - `contrasenya`: String. Contraseña del usuario.
- **`cerrar_sesion`:** cierra la sesión de usuario en el sistema.
   - `token`: String. Token de la sesión abierta del usuario.
- **`olvido_credenciales`:** envía un correo de recuperación de credenciales al email del usuario.
   - `email`: String. Correo electrónico del usuario.
- **`recuperar_credenciales`:** cambia la contraseña mediante un token de recuperación.
   - `email`: String. Correo electrónico del usuario.
   - `token`: String. Token de recuperación de cuenta del usuario.
- **`baja_del_sistema`:** elimina el usuario y sus datos del sistema.
   - `token`: String. Token de la sesión del usuario.

## Ventajas

- Funciona con cualquier base de datos MySQL
- Devuelve un esquema fiel y actual de la base de datos
- Proporciona un sistema de autentificación basado en usuarios, grupos y permisos.
- Proporciona un sistema de autorización basado en hooks.
- Proporciona un sistema de hooks que será central para los plugins.
- Proporciona un sistema de plugins básico para la autorización personalizable.
- Proporciona un sistema de logging para registrar todas las peticiones con los detalles que se requieran.
- Proporciona un sistema de acceso y manipulación de datos que funciona con cualquier base de datos ya operativa.
- Minimiza el tiempo de desarrollo al máximo.
- Separa muy eficientemente el código del core de la aplicación, del que es pura lógica de negocio.
- Todo está reducido en 1 solo fichero, el «index.php».
- Es gratis.
- Es extendible.
- Es personalizable.

## Desventajas

- Requiere de un usuario con permisos suficientes para hacer consultas a tablas internas de la base de datos.
- Solamente proporciona una interfaz por HTTP: no hay interfaz de usuario actualmente.
- Solamente está en castellano actualmente.
- No proporciona un sistema de filtro, ordenación o paginación en las consultas actualmente.

## Elaboración

Se hizo en unas cuantas horas, asistido por ChatGPT. Se podría decir que piqué un 10% o menos de código que el que tendría que haber picado. Probablemente menos. Y es un código de calidad. Pero sobre todo, pensado. Me ha ahorrado pensar algoritmos, buscar librerías, etc.

Hay un documento en la carpeta de «tests» donde explico bastante paso a paso cómo lo he hecho. Es un PDF, [test/Prompts para código. Parte 1.pdf](<./test/Prompts para código. Parte 1.pdf>).

## Tests

Los tests están hechos para node.js + mocha. Se ejecutarían usando `mocha test/test` o `npx mocha test/test`.

Los tests requieren de una base de datos con las tablas de autentificación y autorización mínimas.

## Logs

Por defecto están activados unos logs que te dejan constancia de la hora y las cabeceras de la petición.

## Plugins

En la carga de `index.php`, hay un momento donde se cargan los plugins. La carga de plugins cargará los ficheros `plugins/activos/*/load.php`.

Para ir más allá en el desarrollo de `tiki`, te interesa saber hacer un plugin. Con los plugins, puedes añadirle un grupo de *hooks* a tu aplicación, y así extender la lógica de negocio desacopladamente.

Tienes un ejemplo de plugin funcional en [plugins/activos/BasicAuth](./plugins/activos/BasicAuth). En esta carpeta hay un fichero [load.php](./plugins/activos/BasicAuth/load.php) con el código fuente de un plugin muy básico.

También tienes un plugin en blanco en [plugins/activos/BasicRest/load.php](./plugins/activos/BasicRest/load.php). Puedes sobreescribirlo para añadirle tu lógica de negocio personalizada a la aplicación, de forma global, o puedes ir añadiendo plugins para continuar un desarrollo modular de tus lógicas de negocio.

Actualmente, los hooks disponibles en la aplicación son:

- `tiki.procedimiento.esquema:antes`
- `tiki.procedimiento.esquema:despues`
- `tiki.procedimiento.seleccionar:antes`
- `tiki.procedimiento.seleccionar:despues`
- `tiki.procedimiento.insertar:antes`
- `tiki.procedimiento.insertar:despues`
- `tiki.procedimiento.actualizar:antes`
- `tiki.procedimiento.actualizar:despues`
- `tiki.procedimiento.eliminar:antes`
- `tiki.procedimiento.eliminar:despues`
- `tiki.procedimiento.obtener_parametros:antes`
- `tiki.procedimiento.obtener_parametros:despues`
- `tiki.procedimiento.autenticar_usuario:antes`
- `tiki.procedimiento.autenticar_usuario:despues`
- `tiki.procedimiento.validar_operacion:antes`
- `tiki.procedimiento.validar_operacion:despues`
- `tiki.procedimiento.log_de_peticion:antes`
- `tiki.procedimiento.log_de_peticion:despues`
- `tiki.procedimiento.autorizar_peticion:antes`
- `tiki.procedimiento.autorizar_peticion:despues`
- `tiki.procedimiento.realizar_accion:antes`
- `tiki.procedimiento.realizar_accion:despues`

En el caso del plugin de **BasicAuth**, se utilizan simplemente 2 hooks:

 - `tiki.procedimiento.realizar_accion:antes`
 - `tiki.procedimiento.seleccionar:despues`

Algunos hooks reciben parámetros y otros no. La mayoría no, pero por ejemplo, el procedimiento de *seleccionar:después* sí que recibe un parámetro, por referencia, para que podamos alterar la salida de datos directamente desde el parámetro del hook.


## Conclusión

La herramienta `tiki` se presenta como un driver entre una base de datos MySQL y las operaciones CRUD básicas mediante un sistema basado en PHP estático.

Fácil de instalar, fácil de adaptar a cualquier proyecto, y fácil de extender y personalizar, con unos requisitos mínimos pero usable para cualquier tipo de proyecto, en unos segunos puedes tener en un servidor un acceso controlado a los datos de una base de datos MySQL dada.

Este proyecto está pensado para minimizar y acelerar al máximo el proceso de desarrollo de un back-end basado en base de datos securizado, y con unos requisitos basados en PHP y MySQL que son tecnologías extendidas y abaratadas.

Ya está, se considera un proyecto clave en el transcurso de mi carrera como software developer, porque este simple "script" ofrece un boilerplate muy avanzado para cualquier desarrollo back-end, desde escuelas online, blogs, lo que sea. No facilita el front-end, pero minimiza al máximo el back-end.

Es todo. No sé, no hay más que decir. Bueno, que este tipo de herramienta es lo que te habrían explicado y dado en un principio y desde un principio, si estuviéramos en un sitio limpio. Pero aquí huele mal.