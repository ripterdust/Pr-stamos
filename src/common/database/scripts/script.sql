create database prestamos;

use prestamos;

create table usuarios(
    usuario_id          int not null primary key,
    nombre              varchar(200) not null,
    correo              varchar(200) not null,
    password            varchar(200) not null,
    rol                 int not null
);