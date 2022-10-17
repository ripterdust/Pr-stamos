#Creando la base de datos
CREATE DATABASE prestamos;

# Seleccionando la base de datos
USE prestamos;

CREATE TABLE roles (
    rol_id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre                  VARCHAR(200) NOT NULL UNIQUE 
);

CREATE TABLE opciones_menu (
    opcion_id               INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre                  VARCHAR(200) NOT NULL,
    rol_id                  INT NOT NULL,

    FOREIGN KEY (rol_id) REFERENCES roles(rol_id)

);

CREATE TABLE usuarios(
    usuario_id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(200) NOT NULL,
    correo              VARCHAR(200) NOT NULL UNIQUE,
    password            VARCHAR(200) NOT NULL,
    rol                 INT NOT NULL DEFAULT 1,

    FOREIGN KEY (rol) REFERENCES roles(rol_id)
);

CREATE TABLE clientes(
    cliente_id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(200) NOT NULL,
    correo              VARCHAR(200) NOT NULL UNIQUE,
    telefono            VARCHAR(10) NOT NULL, 
    identificacion      VARCHAR(50) NOT NULL,
    prestamista_id      INT NOT NULL,

    FOREIGN KEY (prestamista_id) REFERENCES usuarios(usuario_id)
);

# Tablas para mantenimiento de moneda 
CREATE TABLE mantenimiento_moneda(
    moneda_id           INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(15) NOT NULL UNIQUE,
    prefix              VARCHAR(5) NOT NULL UNIQUE
);