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

-- Crear tabla 'usuario'
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasenya VARCHAR(255) NOT NULL,
    confirmado INT DEFAULT 0,
    token_confirmacion VARCHAR(255),
    token_recuperacion VARCHAR(255)
);

-- Crear tabla 'grupo'
CREATE TABLE IF NOT EXISTS grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Crear tabla 'permiso'
CREATE TABLE IF NOT EXISTS permiso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Crear tabla de relación 'usuario_y_grupo'
CREATE TABLE IF NOT EXISTS usuario_y_grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_grupo INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_grupo) REFERENCES grupo(id)
);

-- Crear tabla de relación 'grupo_y_permiso'
CREATE TABLE IF NOT EXISTS grupo_y_permiso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_grupo INT,
    id_permiso INT,
    FOREIGN KEY (id_grupo) REFERENCES grupo(id),
    FOREIGN KEY (id_permiso) REFERENCES permiso(id)
);

-- Crear tabla de 'sesion'
CREATE TABLE IF NOT EXISTS sesion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    token VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Crear tabla de 'nota'
CREATE TABLE IF NOT EXISTS nota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT,
    fecha_de_expiracion DATETIME,
    hora_de_aviso TIME,
    fecha_de_creacion TIMESTAMP,
    fecha_de_ultima_actualizacion TIMESTAMP
);

-- Insertar usuario 'administrador'
INSERT INTO usuario (contrasenya, email, confirmado) VALUES ('$2y$10$gqDpwNjFaeGS2xmzvcDf1OxQHbH9I5nGAoiQafQabutufDZTD6VTG', 'admin@admin.org', 1);

-- Insertar grupo 'administración global'
INSERT INTO grupo (nombre, descripcion) VALUES ('administración global', 'Grupo de administración global');

-- Insertar permiso 'administrar globalmente'
INSERT INTO permiso (nombre, descripcion) VALUES ('administrar globalmente', 'Permiso para administrar globalmente');

-- Asociar usuario 'administrador' al grupo 'administración global'
INSERT INTO usuario_y_grupo (id_usuario, id_grupo) VALUES ((SELECT id FROM usuario WHERE usuario.email = 'admin@admin.org'), (SELECT id FROM grupo WHERE grupo.nombre = 'administración global'));

-- Asociar grupo 'administración global' al permiso 'administrar globalmente'
INSERT INTO grupo_y_permiso (id_grupo, id_permiso) VALUES ((SELECT id FROM grupo WHERE grupo.nombre = 'administración global'), (SELECT id FROM permiso WHERE permiso.nombre = 'administrar globalmente'));


