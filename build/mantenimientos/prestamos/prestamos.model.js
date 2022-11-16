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
exports.PrestamosModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class PrestamosModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'prestamos';
        this.idTabla = 'prestamo_id';
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla préstamos',
                requerido: false,
            },
            {
                nombre: 'fecha_creacion',
                descripcion: 'Fecha de creación del préstamo',
                requerido: false,
            },
            {
                nombre: 'cantidad',
                descripcion: 'Cantidad del préstamo',
                requerido: true,
            },
            {
                nombre: 'cuotas',
                descripcion: 'Cuotas del préstamo',
                requerido: true,
            },
        ];
    }
    obtienePrestamos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool
                    .select([
                    'prestamos.prestamo_id',
                    'clientes.nombre as nombre_cliente',
                    'prestamos.cuotas',
                    'prestamos.cantidad',
                    'prestamos.interes',
                    'prestamos.fecha_creacion',
                    'usuarios.nombre as prestamista',
                ])
                    .from(this.nombreTabla)
                    .leftJoin('clientes', `${this.nombreTabla}.cliente_id`, 'clientes.cliente_id')
                    .leftJoin('usuarios', `${this.nombreTabla}.prestamista_id`, 'usuarios.usuario_id')
                    .orderBy('prestamos.prestamo_id', 'desc');
                return consulta;
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    prestamosRecientes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool
                    .select([
                    'clientes.nombre as cliente',
                    'prestamos.cantidad',
                    'prestamos.cuotas',
                    'usuarios.nombre as prestamista',
                    'prestamos.fecha_creacion',
                ])
                    .from(this.nombreTabla)
                    .leftJoin('clientes', `${this.nombreTabla}.cliente_id`, 'clientes.cliente_id')
                    .leftJoin('usuarios', `${this.nombreTabla}.prestamista_id`, 'usuarios.usuario_id')
                    .orderBy('prestamos.prestamo_id', 'desc')
                    .limit(10);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    nuevoPrestamo(req, noCuotas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = yield this.agregar(req);
                const idPrestamo = consulta.data[0];
                const { cantidad, interes } = req;
                const respuestaCuotas = yield this.crearCuotas(cantidad, interes, noCuotas, idPrestamo);
                respuestaCuotas.data.pop();
                respuestaCuotas.data.push(consulta.data[0]);
                return respuestaCuotas;
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    crearCuotas(cantidad, interes, noCuotas = 12, prestamo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuotas = [];
            const totalidadPorcentaje = 100;
            const cantidadConInteres = (cantidad / totalidadPorcentaje) * (totalidadPorcentaje + interes);
            for (let no_cuota = 1; no_cuota <= noCuotas; no_cuota++) {
                cuotas.push({
                    pagado: false,
                    no_cuota,
                    prestamo_id,
                    fecha_pago: new Date(new Date().setMonth(new Date().getMonth() + no_cuota)),
                    cantidad: cantidadConInteres / noCuotas,
                });
            }
            const consulta = yield this.insertarCuotas(cuotas);
            return consulta;
        });
    }
    insertarCuotas(cuotas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.insert(cuotas).into('cuotas');
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    crearLogs(cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.insert({ tipo: 1, cantidad }).into('logs');
                return consulta;
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
}
exports.PrestamosModel = PrestamosModel;
