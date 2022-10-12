create database prestamos;

use prestamos;

create table usuarios(
    usuario_id          int not null primary key auto_increment,
    nombre              varchar(200) not null,
    correo              varchar(200) not null unique,
    password            varchar(200) not null,
    rol                 int not null default 1
);

create table clientes(
    cliente_id          int not null primary key auto_increment,
    nombre              varchar(200) not null,
    correo              varchar(200) not null unique,
    telefono            varchar(10) not null, 
    prestamista_id      int not null,

    foreign key (prestamista_id) references usuarios(usuario_id)
);
