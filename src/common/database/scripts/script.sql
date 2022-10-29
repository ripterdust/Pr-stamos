-- BORRANDO LA DB
DROP DATABASE prestamos;

-- Creando la base de datos
CREATE DATABASE prestamos;

-- Seleccionando la base de datos
USE prestamos;


-- Roles
CREATE TABLE roles (
    rol_id                  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre                  VARCHAR(200) NOT NULL UNIQUE 
);

-- Tabla de las opciones de menú

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
    nit                 VARCHAR(15) NOT NULL,
    fecha_nacimiento    DATETIME NOT NULL,
    direccion           VARCHAR(200),
    prestamista_id      INT NOT NULL,

    FOREIGN KEY (prestamista_id) REFERENCES usuarios(usuario_id)
);

-- Tablas para mantenimiento de moneda 
CREATE TABLE monedas(
    moneda_id           INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(15) NOT NULL UNIQUE,
    prefix              VARCHAR(5) NOT NULL UNIQUE
);

-- Tablas relacionadas con los préstamos
CREATE TABLE tipos_prestamos (
    tipo_id             INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(50) NOT NULL,
    interes             INT NOT NULL
);

CREATE TABLE prestamos(
    prestamo_id         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cantidad            DECIMAL(20, 2) NOT NULL,
    prestamista_id      INT NOT NULL,
    cliente_id          INT NOT NULL, 
    cuotas              INT NOT NULL DEFAULT 12,
    interes             int not null default 5,
    moneda_id           int not null,

    FOREIGN KEY (moneda_id) REFERENCES monedas(moneda_id),
    FOREIGN KEY (prestamista_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(cliente_id)
);


CREATE TABLE cuotas(
    cuota_id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_pago          DATETIME NOT NULL,
    pagado              TINYINT(1),
    prestamo_id         INT NOT NULL,
    no_cuota            INT NOT NULL,
    cantidad            FLOAT NOT NULL,
    FOREIGN KEY(prestamo_id) REFERENCES prestamos(prestamo_id)             
);

insert into cuotas(
    fecha_pago,
    pagado,
    prestamo_id,
    no_cuota,
    cantidad
) values (
    now(),
    0,
    1, 
    1,
    150.35
);

insert into prestamos (
    cantidad,
    prestamista_id,
    cliente_id
) values (
    100,
    1, 
    1
);