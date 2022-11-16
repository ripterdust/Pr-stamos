"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutas = void 0;
const express_1 = require("express");
const usuario_router_1 = require("../seguridad/usuario/usuario.router");
const usuario_router_2 = require("../mantenimientos/usuarios/usuario.router");
const cliente_router_1 = require("../mantenimientos/clientes/cliente.router");
const rol_router_1 = require("../mantenimientos/roles/rol.router");
const opcionesMenu_router_1 = require("../mantenimientos/opcionesDeMenu/opcionesMenu.router");
const monedas_router_1 = require("../mantenimientos/monedas/monedas.router");
const prestamos_router_1 = require("../mantenimientos/prestamos/prestamos.router");
const cuotas_router_1 = require("../mantenimientos/coutas/cuotas.router");
const logs_router_1 = require("../mantenimientos/logs/logs.router");
const config_router_1 = require("../mantenimientos/config/config.router");
const router = (0, express_1.Router)();
const endpoint = '/';
const rutasGenerales = {
    router,
    endpoint,
};
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido a su sistema de préstamos',
        status: 200,
        urlApp: 'https://estaeslaurl.com',
    });
});
exports.rutas = [
    rutasGenerales,
    usuario_router_1.rutaUsuario,
    usuario_router_2.usuariosRuta,
    cliente_router_1.clientesRuta,
    rol_router_1.rolesRuta,
    opcionesMenu_router_1.opcionesMenuRuta,
    monedas_router_1.monedasRuta,
    prestamos_router_1.prestamosRuta,
    cuotas_router_1.cuotasRuta,
    config_router_1.configRuta,
    logs_router_1.logsRuta,
];
