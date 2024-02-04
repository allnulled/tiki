![Logo_de_tiki](./docs/tiki.png)

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

## Tests

Los tests están hechos para node.js + mocha. Se ejecutarían usando `mocha test/test` o `npx mocha test/test`.

## Logs

Por defecto están activados unos logs que te dejan constancia de la hora y las cabeceras de la petición.



