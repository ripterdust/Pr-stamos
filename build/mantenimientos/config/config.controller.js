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
exports.ConfigController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const config_model_1 = require("./config.model");
class ConfigController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new config_model_1.ConfigModel();
    }
    modificarCaja(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const dinero = parseInt(req.body.caja);
            console.log(dinero);
            const respuesta = yield this.modelo.obtenerPorId(1);
            const { caja } = respuesta.data[0];
            const dineroTotal = caja + dinero;
            const consulta = yield this.modelo.actualizarPorId(1, { caja: dineroTotal });
            if (respuesta.statusCode === 200) {
                const crearLog = yield this.modelo.crearLogs(dinero);
            }
            return consulta;
        });
    }
}
exports.ConfigController = ConfigController;
