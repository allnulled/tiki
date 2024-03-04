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
    fecha_de_ultima_actualizacion TIMESTAMP,
    esta_destacado VARCHAR(50),
    prioridad VARCHAR(50),
    clasificacion VARCHAR(50),
    modo VARCHAR(50),
    tags_principales TEXT
);