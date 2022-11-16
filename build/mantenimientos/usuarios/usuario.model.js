"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMantenimientoModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class UsuarioMantenimientoModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'usuarios';
        this.idTabla = 'usuario_id';
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador de el usuario',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de usuario',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo electrónico del usuario',
                requerido: true,
            },
            {
                nombre: 'rol',
                descripcion: 'Rol del usuario',
                requerido: true,
            },
        ];
        this.nombreCampos = this.obtenerCampos();
    }
}
exports.UsuarioMantenimientoModel = UsuarioMantenimientoModel;
