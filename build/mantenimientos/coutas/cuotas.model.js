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
exports.CuotasModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class CuotasModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'cuotas';
        this.idTabla = 'cuota_id';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la cuota',
                requerido: false,
            },
            {
                nombre: 'fecha_pago',
                descripcion: 'Fecha de pago de la cuota',
                requerido: true,
            },
            {
                nombre: 'pagado',
                descripcion: 'Indica si la cuota ya se ha pagado o no',
                requerido: true,
            },
            {
                nombre: 'prestamo_id',
                descripcion: 'Identificador del préstamo',
                requerido: true,
            },
            {
                nombre: 'no_cuota',
                descripcion: 'Número de cuota',
                requerido: true,
            },
        ];
    }
    obtieneCuotasPorPrestamoId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.select('*').from(this.nombreTabla).where('prestamo_id', id);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
}
exports.CuotasModel = CuotasModel;
