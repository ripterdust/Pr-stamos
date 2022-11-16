"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonedaModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class MonedaModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'monedas';
        this.idTabla = 'moneda_id';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la Moneda',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de la Moneda',
                requerido: true,
            },
            {
                nombre: 'prefix',
                descripcion: 'Prefijo de la Moneda',
                requerido: true,
            }
        ];
        this.nombreCampos = this.obtenerCampos();
    }
}
exports.MonedaModel = MonedaModel;
