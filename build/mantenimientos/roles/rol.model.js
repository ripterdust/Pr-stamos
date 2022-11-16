"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class RolModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'roles';
        this.idTabla = 'rol_id';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador del rol',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre del rol',
                requerido: true,
            },
        ];
        this.nombreCampos = this.obtenerCampos();
    }
}
exports.RolModel = RolModel;
