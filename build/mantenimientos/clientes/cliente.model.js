"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class ClienteModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'clientes';
        this.idTabla = 'cliente_id';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de el usuario',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de cliente',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo electrónico del cliente',
                requerido: true,
            },
            {
                nombre: 'telefono',
                descripcion: 'Teléfono del cliente',
                requerido: true,
            },
            {
                nombre: 'identificacion',
                descripcion: 'Número de identificación',
                requerido: true,
            },
            {
                nombre: 'nit',
                descripcion: 'Número de identificación tributaria',
                requerido: true,
            },
            {
                nombre: 'direccion',
                descripcion: 'Dirección del cliente',
                requerido: true,
            },
            {
                nombre: 'fecha_nacimiento',
                descripcion: 'Fecha de nacimiento del cliente',
                requerido: true,
            },
            {
                nombre: 'prestamista_id',
                descripcion: 'Identificador del prestamista',
                requerido: true,
            },
        ];
        this.nombreCampos = this.obtenerCampos();
    }
}
exports.ClienteModel = ClienteModel;
