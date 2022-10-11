create database prestamos;

use prestamos;

create table usuarios(
    usuario_id          int not null primary key auto_increment,
    nombre              varchar(200) not null,
    correo              varchar(200) not null unique,
    password            varchar(200) not null,
    rol                 int not null default 1
);