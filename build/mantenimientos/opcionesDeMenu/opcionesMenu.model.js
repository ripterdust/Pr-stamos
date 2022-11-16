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
exports.OpcionesMenuModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class OpcionesMenuModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'opciones_menu';
        this.idTabla = 'opcion_id';
        this.nombreOpcion = 'nombre';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la opción de menú',
                requerido: false,
            },
            {
                nombre: this.nombreOpcion,
                descripcion: 'Nombre de la opción',
                requerido: true,
            },
            {
                nombre: 'rol_id',
                descripcion: 'Identificador del rol',
                requerido: true,
            },
        ];
        this.nombreCampos = this.obtenerCampos();
    }
    obtenerOpciones(rolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('opciones');
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.select(this.nombreOpcion).from(this.nombreTabla).where('rol_id', rolId);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                console.log(err);
                return this.error(err);
            }
        });
    }
}
exports.OpcionesMenuModel = OpcionesMenuModel;
