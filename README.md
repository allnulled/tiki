![Logo_de_tiki](./test/tiki.png)

El proyecto «tiki» es 1 script que sirve para exponer una base de datos MySQL cualquiera vía PHP estático y ofreciendo una capa de autentificación y autorización personalizable.

## Índice

- [Índice](#índice)
- [Capacidades](#capacidades)
- [Instalación](#instalación)
  - [Paso 1. Sincroniza la base de datos con las tablas mínimas de `tiki`](#paso-1-sincroniza-la-base-de-datos-con-las-tablas-mínimas-de-tiki)
  - [Paso 2. Descarga `tiki` en cualquier directorio de tu servidor PHP estático](#paso-2-descarga-tiki-en-cualquier-directorio-de-tu-servidor-php-estático)
  - [Paso 3. Enciende y visita el servidor con un navegador](#paso-3-enciende-y-visita-el-servidor-con-un-navegador)
  - [Paso 4. Identifícate en la interfaz gráfica](#paso-4-identifícate-en-la-interfaz-gráfica)
- [Uso](#uso)
- [Uso del cliente con interfaz gráfica](#uso-del-cliente-con-interfaz-gráfica)
- [Uso de la API REST directo](#uso-de-la-api-rest-directo)
- [Ventajas](#ventajas)
- [Desventajas](#desventajas)
- [Elaboración](#elaboración)
- [Tests](#tests)
- [Logs](#logs)
- [Plugins](#plugins)
- [Interfaz](#interfaz)
- [Seguridad](#seguridad)
- [Conclusión](#conclusión)
- [Actualmente](#actualmente)

## Capacidades

Las operaciones que se permiten en el sistema son:
- Esquema
- Seleccionar
- Insertar
- Actualizar
- Eliminar
- Registrar usuario
- Confirmar cuenta
- Iniciar sesión
- Cerrar sesión
- Olvido credenciales
- Recuperar credenciales
- Baja del sistema

## Instalación

Ahora explicaré por pasos cómo instalar esta herramienta para poder explotarla.

### Paso 1. Sincroniza la base de datos con las tablas mínimas de `tiki`

### Paso 2. Descarga `tiki` en cualquier directorio de tu servidor PHP estático

### Paso 3. Enciende y visita el servidor con un navegador

### Paso 4. Identifícate en la interfaz gráfica

 - **Paso 1.** Comprobar que la base de datos tenga las tablas mínimas para que el sistema de autorización funcione. Tienes el script que las resetea en [test/autentificacion.sql](./test/autentificacion.sql). Úsalo en tu base de datos MySQL para crear las tablas mínimas para pasar los tests.
 - **Paso 2.** Descargar el proyecto de [https://github.com/allnulled/tiki](https://github.com/allnulled/tiki).
 - **Paso 3.** Colocar el proyecto en un servidor para PHP estático, en la carpeta que quieras.
    - Si no tienes uno, mírate [XAMPP](https://www.apachefriends.org/es/download.html) que es lo más fácil de instalar.
 - **Paso 4.** Encender el servidor si no lo está ya, e ir a la URL correspondiente del «index.php».
    - *Cuidado: puede que si no pones el «index.php» explícito en la URL haga cosas raras, a mí me ha pasado.*
 - **Paso 5.** Ya está, ya tienes la API funcionando. Puedes ir con tu navegador a la URL del «app/index.html». Ahí tienes la interfaz gráfica del cliente HTML por defecto de `tiki`.

## Uso

Tienes 2 formas principales de usar `tiki`:

 - Vía el cliente con interfaz gráfica en HTML/Vue.js (v2).
 - Vía la REST API en PHP.

Como usuario no desarrollador, te interesa la interfaz gráfica en HTML.

Como usuario desarrollador puede interesarte la REST API.

A continuación se explican ambos.

## Uso del cliente con interfaz gráfica

Si eres un usuario no desarrollador, te interesa acceder directamente al cliente con interfaz gráfica. Para ello, abre el navegador en la URL correspondiente al directorio donde hayas instalado `tiki`, y la ruta agregada: «app/index.html». A partir de ahí, puedes identificarte mediante el login de la aplicación, y ya acceder a la base de datos plenamente.

## Uso de la API REST directo

Por otro lado, si eres usuario sí desarrollador, te interesa saber cómo funciona la API.

Una vez instalado `tiki`, ya puedes empezar a hacer peticiones HTTP a la API REST. Pero no vale hacer las peticiones de cualquier manera, sino que hay un protocolo de entendimiento entre las peticiones y el servidor. Esto es lo que se explica a continuación.

Primero, si quieres ver un ejemplo completo del uso de todos los servicios antes listados, puedes ir directamente a [test/test.js](./test/test.js). Ahí tienes un test hecho con `node.js + mocha` que demuestra un uso correcto de la API.

A continuación, describo los campos que se requieren en cada servicio. Hay que tener en cuenta que soporta tanto parámetros GET, POST o POST+JSON. Este último es el más recomendado. Para él, tienes que agregar la cabecera HTTP "Content-Type: application/json" en tus peticiones, y en el cuerpo pasarle directamente un objeto JSON.

El primer término es el que se tiene que pasar al parámetro `operacion`, sea vía GET, POST o POST+JSON. Los términos que aparecen bajo el primero, son otros parámetros de la misma petición que hay que especificar.

Esta es la lista de operaciones:

- **`esquema`:** devuelve el esquema de la base de datos. No tiene parámetros.
- **`seleccionar`:** selecciona datos de una tabla de la base de datos.
   - `tabla`: String. Nombre de la tabla que se selecciona.
   - `donde`: Array&lt;Array&lt;String,String[,String|Array]&gt;&gt;. Opcional. Array de tríos de Strings, donde el tercer String puede omitirse, o aceptar un Array en su lugar. Con este parámetro se pueden ejecutar consultar, y personalizar las reglas de filtro que se quieren aplicar. Se permiten diferentes operaciones de filtrado (por eso el primer Array), que permiten distintas operaciones. La sintaxis a seguir es siempre `[[columna, operador, parametro]]`. Se aceptan los siguientes operadores:
     - `<`: menor que.
     - `<=`: menor o igual que.
     - `>`: menor que.
     - `>=`: mayor o igual que.
     - `=`: igual que.
     - `!=`: diferente de.
     - `LIKE`: parecido a. Permite el operador `%` para hacer búsquedas de texto por patrones.
     - `NOT LIKE`: no parecido a. Lo mismo que el anterior, pero negado.
     - `IS NULL`: es nulo.
     - `IS NOT NULL`: no es nulo.
     - `IN`: entre. Este operador acepta como parámetro un Array de valores.
     - `NOT IN`: entre. Lo mismo que el anterior, pero negado.
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

Los tests están hechos para node.js + mocha. Se ejecutarían usando `mocha test/test` o `npx mocha test/test`. Requieren de node y mocha instalados y disponibles desde consola.

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


## Interfaz

Para acceder a la interfaz, en lugar de visitar el `index.php`, hay que visitar el `app/index.html`. Aquí se hospeda una aplicación en Vue.js (v2).

Para conocer más cómo se extiende este boilerplate, que se llama [allnulled/start-front-oldschool](https://github.com/allnulled/starter-front-oldschool/), puedes ir a su documentación dentro de este nismo proyecto, en caso de que quieras extender las funcionalidades y documentación base del proyecto. Está en [app/README.md](./app/README.md).

Además de todas las ventajas que arrastra del proyecto del que es origen, también ofrece algunas funcionalidades extra que son interesantes.

Para el refresco automático hay un servidor escrito, en `app/reloader.js`. Este servidor es en node.js. Por lo tanto, requieres de node.js para levantarlo. Puedes prescindir de él, porque en producción no se usa. Se usa solo en desarrollo. Pero para el desarrollo va muy bien. Para usar este servidor, debes ejecutar: `node app/reloader.js`, y automáticamente se encenderá un servidor por el puerto `3000`. Necesitas tener instalados los módulos `node_modules` correspondientes en la carpeta de `app/node_modules`. Para ello debes hacer `npm install` antes, desde la carpeta de `app`.

Además de esto, para escribir tu *payload* en el refresco automático, esto es, un script del lado del cliente que te emplace en el escenario donde puedes testear la *feature* que estás desarrollando concreta. Para escribir esa porción de código, puedes ir a [app/lib/sistema_de_refresco_automatico/sistema_de_refresco_automatico.js](./app/lib/sistema_de_refresco_automatico/sistema_de_refresco_automatico.js), y buscar la función `payload`. Ahí puedes escribir lo que requieras para acelerar tu desarrollo.

Este manual no pretende abarcar las posibilidades de esta aplicación front. Para más información sobre ella, debes dirigirte a la documentación en [app/README.md](./app/README.md).

## Seguridad

Para que `tiki` funcione correctamente y de manera segura, deberías tomar algunas medidas.

**Medida 1. Cambia la contraseña del administrador.**

El administrador, con correo ficticio `admin@admin.org`, tiene una contraseña por defecto, que es `pordefecto`. Si no se cambia, puede suponer una puerta de entrada para cualquier usuario ajeno a la aplicación, por lo cual desemboca en una vulnerabilidad de alto riesgo. El ataque consistiría en loguearse como el usuario administrador, que tiene una clave por defecto, que es `pordefecto`.

**Medida 2. Cambia la variable de entorno de ejecución diferente de `test`.**

En el fichero `configuraciones.php` están definidas algunas variables globales importantes. Una de ellas es `$_CONFIGURACIONES["environment"]`.

Si `$_CONFIGURACIONES["environment"]` equivale a `"test"`, habrá 2 puntos vulnerables en la aplicación.

Un primer punto vulnerable es cuando se hace la `operacion: "registrar_usuario"`. Cuando se registra un usuario, se envía un correo electrónico con un link para activar la cuenta. Pero si está en entorno de `"test"`, también se envía el token de confirmación en la respuesta. Esto no es necesariamente una vulnerabilidad, simplemente puedes dar de alta en el sistema a correos electrónicos a los que no tienes acceso, y puedes entrar usando su correo electrónico para identificarte. Pero en principio, no estarías invadiendo la cuenta de nadie, sino creando una cuenta desde 0, y que funciona con un correo electrónico al que no tienes acceso, simplemente.

Un segundo punto vulnerable es cuando se hace la `operacion: "olvido_credenciales"`. Cuando se olvidan las credenciales, se envía un correo electrónico con un link para acceder a la cuenta mediante el token de recuperación. Una vez dentro, ya puedes cambiar la contraseña más cómodamente. Pero si está en entorno de `"test"`, también se envía el token de recuperación en la respuesta. Esto sí es necesariamente una vulnerabilidad como tal, y muy grave, y permite el acceso de cualquier usuario a cualquier cuenta mediante el token de recuperación de una cuenta activa.

Es por eso que es importantísimo cambiar el valor de esta variable `$_CONFIGURACIONES["environment"]` a cualquier otro valor que no sea `"test"`.

**Medida 3. Cambia las credenciales para la conexión a la base de datos.**

En el fichero de `configuraciones.php` aparecen las credenciales de la base de datos. Por defecto, hay unos valores. Debes adecuarlos a tu entorno, para que se conecte a la base de datos que tú le indiques.

Esto no es una vulnerabilidad, pero es crucial en el funcionamiento de la aplicación.

**Medida 4. Cuidado con compartir el fichero de configuraciones.**

En el fichero de `configuraciones.php` aparecen las credenciales de la base de datos. Estos datos le dan acceso a cualquiera a un sistema completo de datos del cual la aplicación depende plenamente. Son considerados de los datos más sensibles de la aplicación. Pero de alguna manera tienen que subirse al servidor para funcionar.

La cuestión no es que no se pueda subir al servidor. Pero sí que hay que estar 100% seguro de que este fichero no se sube a ningún repositorio público, dado que luego estaríamos exponiendo nuestras credenciales de la base de datos, a cualquiera. Podemos ser objeto de Google Hacking, y si somos víctimas de un acceso ilícito a la base de datos, podemos sufrir cualquier alteración de los datos.

Definitivamente, cuidado con mostrar este fichero a terceras personas.

**Medida 5. Aplica 'is_private_column' en las columnas que no quieres que sean públicas.**

En el fichero `configuraciones.php` tienes la variable global `$_METAESQUEMA`. En ella, puedes especificar `"{tabla}.{columna}" => $metaatributos`. Pues como meta-atributo, puedes añadir el campo `"is_private_column"`. Esto hará que (1) no se pueda ver, (2) no se pueda filtrar, (3) no se pueda insertar y (4) no se pueda actualizar dicho campo, bajo ningún concepto, utilizando la API normal.

Si luego quieres, puedes habilitar nuevos servicios para interactuar con este campo.

Como alternativa final, puedes hacer un hook desde algún plugin para personalizar la lógica sensible con este campo en cada uno de los puntos del ciclo de vida de la aplicación REST API que precises.

**Medida 6. Securiza las operaciones de la API REST mediante hooks de plugins.**

En última instancia, y cuando requieras alguna lógica de negocio algo más compleja que, simplemente, no se pueda filtrar por cierta columna, entonces debes usar los hooks de los plugins.

Para hacerte una idea de cómo se pueden utilizar los hooks, tienes el ejemplo de [plugins/activos/BasicAuth/load.php](./plugins/activos/BasicAuth/load.php). Ahí puedes ver un ejemplo. Para lo demás, tendrás que explorar mínimamente `index.php` y localizar dónde se llama al hook que te interesa y cómo. Y de ahí, usarlo de la forma más conveniente para cada caso.

Esta es la última fase de seguridad de `tiki`. Con ella, se espera poder cubrir todas las casuísticas de lógica de negocio puramente, reduciendo drásticamente el tiempo de desarrollo, puesto que automáticamente tenemos una REST API, y solo tenemos que procurar que cumpla con los requisitos de **seguridad lógica** o **lógica de seguridad** se deseen.

En este sentido, pensar que tienes todos los datos al descubierto y que tienes que ir caso por caso descubriendo la lógica que quieres entramar para hacerla segura, no es quizás el procedimiento mental más conveniente para abarcar esta parte de la ingeniería. Sí del desarrollo, ojo. Pero no de la ingeniería, probablemente.

Esta es otra mejor forma de abarcarlo, en mi opinión. Consiste en preguntarse 4 cosas:

  - ¿Qué datos interesa que toque cada rol?
  - ¿De qué forma interesa que toque esos datos (visible/no visible, alterable/no alterable)?
  - ¿Qué datos NO interesa que toque cada rol?
  - ¿De qué forma interesa que toque esos datos (visible/no visible, alterable/no alterable)?

Básicamente, cualquier usuario, desde dentro de la aplicación, ya puede alterar ciertos datos y realizar operaciones repetitivas, o costosas, aunque `tiki` intenta ser lo más económico posible en eso, y no se enzarza en multitud de consultas por servicio, sino que se ciñe a interactuar con la base de datos de una forma bastante limitada, pero rápida.

Lo que debe de intentarse es minimizar el fallo. Es decir: si este rol no está concebido para este tipo de dato, directamente no puede interceder. A no ser, de la administración global, como medida de delegación de control al usuario no (necesariamente) desarrollador. Es decir: que al menos 1 usuario sí pueda salvar las operaciones que se queden bloqueadas en un estado erróneo.

Teniendo esto en cuenta, ya creas roles y permisos en función de datos concretos. Y vas asignando esos roles a cada usuario, para que pueda participar en las distintas operaciones contra los distintos datos, siempre en función de roles que puede acumular.



## Conclusión

La herramienta `tiki` se presenta como un driver entre una base de datos MySQL y las operaciones CRUD básicas mediante un sistema basado en PHP estático.

Fácil de instalar, fácil de adaptar a cualquier proyecto, y fácil de extender y personalizar, con unos requisitos mínimos pero usable para cualquier tipo de proyecto, en unos segunos puedes tener en un servidor un acceso controlado a los datos de una base de datos MySQL dada.

Este proyecto está pensado para minimizar y acelerar al máximo el proceso de desarrollo de un back-end basado en base de datos securizado, y con unos requisitos basados en PHP y MySQL que son tecnologías extendidas y abaratadas.

Ya está, se considera un proyecto clave en el transcurso de mi carrera como software developer, porque este simple "script" ofrece un boilerplate muy avanzado para cualquier desarrollo back-end, desde escuelas online, blogs, lo que sea. No facilita el front-end, pero minimiza al máximo el back-end.

Es todo. No sé, no hay más que decir. Bueno, que este tipo de herramienta es lo que te habrían explicado y dado en un principio y desde un principio, si estuviéramos en un sitio limpio. Pero aquí huele mal.






## Actualmente

