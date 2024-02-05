![Logo_de_tiki](./test/tiki.png)

El proyecto «tiki» es 1 script que sirve para exponer una base de datos MySQL cualquiera, poblada o no, vía PHP estático pero con autentificación y autorización personalizable.

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

Primero, si quieres ver un ejemplo completo del uso de todos los servicios antes listados, puedes ir directamente a [test/test.js](./test/test.js). Ahí tienes un test hecho con `node.js + mocha` que demuestra un  uso correcto de la API.

A continuación, describo los campos que se requieren en cada servicio. Hay que tener en cuenta que soporta tanto parámetros GET, POST o POST+JSON. Este último es el más recomendado. Para él, tienes que agregar la cabecera HTTP "Content-Type: application/json" en tus peticiones, y en el cuerpo pasarle directamente un objeto JSON.

- Esquema: devuelve el esquema de la base de datos. No tiene parámetros.
- **Seleccionar**: selecciona datos de una tabla de la base de datos.
   - `tabla`: String. Nombre de la tabla que se selecciona.
- **Insertar**: inserta un registro en una tabla de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se inserta.
   - `valores`: Object. Los campos con los valores que se insertan.
- **Actualizar**: actualiza un registro de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se actualiza.
   - `id`: Integer. Campo `id` del registro que se actualiza.
   - `valores`: Object. Los campos con los valores que se actualizan.
- **Eliminar**: elimina un registro de la base de datos.
   - `tabla`: String. Nombre de la tabla en la que se elimina.
   - `id`: Integer. Campo `id` del registro que se elimina.
- **Registrar usuario:** registra un usuario en el sistema.
   - `nombre`: String. Nombre del nuevo usuario.
   - `email`: String. Correo electrónico del nuevo usuario.
   - `contrasenya`: String. Contraseña del nuevo usuario.
- **Confirmar cuenta:** confirma una cuenta de usuario en el sistema.
   - `email`: String. Correo electrónico del usuario.
   - `token_confirmacion`: String. Token para confirmar la cuenta del usuario.
- **Iniciar sesion:** inicia una sesión de usuario en el sistema o devuelve las credenciales de la que haya abierta.
   - `email`: String. Correo electrónico del usuario.
   - `contrasenya`: String. Contraseña del usuario.
- **Cerrar sesion:** cierra la sesión de usuario en el sistema.
   - `token`: String. Token de la sesión abierta del usuario.
- **Olvido credenciales:** envía un correo de recuperación de credenciales al email del usuario.
   - `email`: String. Correo electrónico del usuario.
- **Recuperar credenciales:** cambia la contraseña mediante un token de recuperación.
   - `email`: String. Correo electrónico del usuario.
   - `token`: String. Token de recuperación de cuenta del usuario.
- **Baja del sistema:** elimina el usuario y sus datos del sistema.
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

