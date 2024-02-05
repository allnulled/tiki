-- Eliminar tablas de relación en orden inverso
DROP TABLE IF EXISTS grupos_y_permisos;
DROP TABLE IF EXISTS usuarios_y_grupos;

-- Eliminar tablas en orden inverso
DROP TABLE IF EXISTS sesiones;
DROP TABLE IF EXISTS permisos;
DROP TABLE IF EXISTS grupos;
DROP TABLE IF EXISTS usuarios;

-- Crear tabla 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    contrasenya VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    confirmado INT DEFAULT 0,
    token_confirmacion VARCHAR(255),
    token_recuperacion VARCHAR(255)
);

-- Crear tabla 'grupos'
CREATE TABLE IF NOT EXISTS grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Crear tabla 'permisos'
CREATE TABLE IF NOT EXISTS permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Crear tabla de relación 'usuarios_y_grupos'
CREATE TABLE IF NOT EXISTS usuarios_y_grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_grupo INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id)
);

-- Crear tabla de relación 'grupos_y_permisos'
CREATE TABLE IF NOT EXISTS grupos_y_permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_grupo INT,
    id_permiso INT,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id),
    FOREIGN KEY (id_permiso) REFERENCES permisos(id)
);

-- Crear tabla de 'sesiones'
CREATE TABLE IF NOT EXISTS sesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    token VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Insertar usuario 'administrador'
INSERT INTO usuarios (nombre, contrasenya, email, confirmado) VALUES ('administrador', 'pordefecto', 'admin@admin.org', 1);

-- Insertar grupo 'administración global'
INSERT INTO grupos (nombre, descripcion) VALUES ('administración global', 'Grupo de administración global');

-- Insertar permiso 'administrar globalmente'
INSERT INTO permisos (nombre, descripcion) VALUES ('administrar globalmente', 'Permiso para administrar globalmente');

-- Asociar usuario 'administrador' al grupo 'administración global'
INSERT INTO usuarios_y_grupos (id_usuario, id_grupo) VALUES ((SELECT id FROM usuarios WHERE usuarios.nombre = 'administrador'), (SELECT id FROM grupos WHERE grupos.nombre = 'administración global'));

-- Asociar grupo 'administración global' al permiso 'administrar globalmente'
INSERT INTO grupos_y_permisos (id_grupo, id_permiso) VALUES ((SELECT id FROM grupos WHERE grupos.nombre = 'administración global'), (SELECT id FROM permisos WHERE permisos.nombre = 'administrar globalmente'));
