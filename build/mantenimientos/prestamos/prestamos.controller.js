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
exports.PrestamosController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const prestamos_model_1 = require("./prestamos.model");
const auth_util_1 = require("../../common/utils/auth.util");
class PrestamosController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new prestamos_model_1.PrestamosModel();
    }
    obtieneTotalidadPrestamos(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.modelo.obtienePrestamos();
            return {
                statusCode: 200,
                message: 'Todos los registro de los préstamos',
                data,
            };
        });
    }
    obtieneUltimosPrestamos(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield this.modelo.prestamosRecientes();
            return respuesta;
        });
    }
    nuevoPrestamo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (0, auth_util_1.obtenerUsuarioId)(req);
            req.body.prestamista_id = id;
            const { cuotas } = req.body;
            const respuesta = yield this.modelo.nuevoPrestamo(req.body, cuotas);
            if (respuesta.statusCode === 200) {
                const crearLog = yield this.modelo.crearLogs(req.body.cantidad);
            }
            return respuesta;
        });
    }
}
exports.PrestamosController = PrestamosController;
