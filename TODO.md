# Quehaceres del proyecto «tiki»:

[x] Pasarlo todo a OOP y encapsular espacio de nombres adecuadamente.
[x] Mejorada documentación
[x] Añadir soporte real para hooks
[x] Añadir soporte real para plugins

[x] Soporte para filtros where en la consulta de seleccionar
  [x] Incluído LIKE, NOT LIKE, IN, NOT IN, IS NULL, IS NOT NULL.
[x] Soporte para reglas de ordenación order-by en la consulta de seleccionar
[x] Soporte para paginación limit-offset en la consulta de seleccionar

[ ] Soporte de safe_columns en insertar y actualizar
[ ] Sistema de autorización automático

[x] Proteger campos del auth con un plugin básico
  [x] usuarios.email
  [x] usuarios.contrasenya
  [x] sesiones.token

[x] UI
  [x] Con auth al principio
  [x] Que coja el esquema y lo despliegue como opciones navegables
  [x] Que permita cambiar de idioma en configuraciones