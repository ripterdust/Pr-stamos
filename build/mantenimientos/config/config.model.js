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
exports.ConfigModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class ConfigModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'config';
        this.idTabla = 'config_id';
    }
    modificarCaja(cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield this.connection.getConnection(this.nombreConexion);
            let consulta = pool.select('*').from('config').where('id', 1);
            console.log(consulta);
        });
    }
    crearLogs(dinero) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.insert({ tipo: dinero >= 0 ? 4 : 3, cantidad: dinero }).into('logs');
                return consulta;
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
}
exports.ConfigModel = ConfigModel;
