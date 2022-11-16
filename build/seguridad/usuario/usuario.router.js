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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutaUsuario = void 0;
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("./usuario.controller"));
const router = (0, express_1.Router)();
const endpoint = '/usuario';
const controller = new usuario_controller_1.default();
router.post('/autenticar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.autenticar(req);
    res.status(response.statusCode).json(response);
}));
router.post('/registrar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield controller.registrar(req);
    res.status(response.statusCode).json(response);
}));
// Exportando la ruta
exports.rutaUsuario = {
    router,
    endpoint,
};
