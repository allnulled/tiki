# Quehaceres del proyecto «tiki»:

[x] Pasarlo todo a OOP y encapsular espacio de nombres adecuadamente.
[x] Mejorada documentación
[x] Añadir soporte real para hooks
[x] Añadir soporte real para plugins
[x] Soporte para filtros where en la consulta de seleccionar
  [x] Incluído LIKE, NOT LIKE, IN, NOT IN, IS NULL, IS NOT NULL.
[x] Soporte para reglas de ordenación order-by en la consulta de seleccionar
[x] Soporte para paginación limit-offset en la consulta de seleccionar
[x] Proteger campos del auth con un plugin básico
  [x] usuarios.email
  [x] usuarios.contrasenya
  [x] sesiones.token
[x] UI
  [x] Con auth al principio
  [x] Que coja el esquema y lo despliegue como opciones navegables
  [x] Que permita cambiar de idioma en configuraciones
[ ] Form types
  [ ] Incluído 1: calendario para fecha, hora, y fecha y hora.
  [ ] Incluído 2: referencias externas a columna con is_identifier
[x] Pasar safe_columns a metaesquema
[ ] Soporte de safe_columns en insertar y actualizar
[ ] Plugabilizar el backend con 5 ficheros clave por plugin:
  [ ] eliminar.sql
  [ ] crear.sql
  [ ] migrar.sql
  [ ] metaesquema.json
  [ ] load.php
[ ] Ficheros mediante upload.php
[ ] Listas en la tabla
  [ ] Que pueda navegarse a la tabla
  [ ] Que pueda navegarse a la tabla con los filtros (mediante $route.query)
  [ ] Que pueda navegarse a la instancia
[ ] Objetos
  [ ] Que pueda navegarse a la tabla
  [ ] Que pueda navegarse a la tabla con los filtros (mediante $route.query)
  [ ] Que pueda navegarse a la instancia