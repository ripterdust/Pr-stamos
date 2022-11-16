"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRuta = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../common/middlewares/auth.middleware");
const crypt_util_1 = require("../../common/utils/crypt.util");
const usuario_controller_1 = require("./usuario.controller");
const router = (0, express_1.Router)();
const endpoint = '/usuarios';
const controller = new usuario_controller_1.UsuarioMantenimientoController();
router.all('*', auth_middleware_1.verificarToken, auth_middleware_1.verificaAutenticacion);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.obtenerTodos(req);
    res.status(response.statusCode).json(response);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, crypt_util_1.atob)(req.body.password);
    const response = yield controller.agregar(req);
    return res.status(response.statusCode).json(response);
}));
router.get('/obtenerTotalRegistros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.obtenerTotalRegistros(req);
    res.status(response.statusCode).json(response);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.obtenerPorId(req);
    return res.status(response.statusCode).json(response);
}));
router.post('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, crypt_util_1.atob)(req.body.password);
    const response = yield controller.actualizarPorId(req);
    return res.status(response.statusCode).json(response);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.eliminarPorId(req);
    return res.status(response.statusCode).json(response);
}));
exports.usuariosRuta = { router, endpoint };
