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

