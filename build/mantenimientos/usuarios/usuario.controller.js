"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMantenimientoController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const usuario_model_1 = require("./usuario.model");
class UsuarioMantenimientoController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new usuario_model_1.UsuarioMantenimientoModel();
    }
}
exports.UsuarioMantenimientoController = UsuarioMantenimientoController;
