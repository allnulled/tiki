-- Eliminar tablas de módulo de NOTAS:
DROP TABLE IF EXISTS notas;

-- Eliminar tablas de relación en orden inverso
DROP TABLE IF EXISTS grupo_y_permiso;
DROP TABLE IF EXISTS usuario_y_grupo;

-- Eliminar tablas en orden inverso
DROP TABLE IF EXISTS nota;
DROP TABLE IF EXISTS sesion;
DROP TABLE IF EXISTS permiso;
DROP TABLE IF EXISTS grupo;
DROP TABLE IF EXISTS usuario;