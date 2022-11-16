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
exports.UsuarioModel = void 0;
const setupInicial_misc_1 = require("../../common/misc/setupInicial.misc");
const model_1 = __importDefault(require("../../common/model"));
const crypt_util_1 = require("../../common/utils/crypt.util");
class UsuarioModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'usuarios';
        this.idTabla = 'usuario_id';
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador único del usuario',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de usuario',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo del usuario',
                requerido: true,
            },
            {
                nombre: 'password',
                descripcion: 'Contraseña del usuario',
                requerido: true,
            },
            {
                nombre: 'rol',
                descripcion: 'Rol del usuario',
                requerido: false,
            },
        ];
        this.nombreCampos = this.obtenerCampos();
        this.rolAdministrador = 1;
        this.rolCajero = 2;
    }
    agregarAutenticar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = (0, crypt_util_1.atob)(req.body.password);
            const respuesta = yield this.setupInicial();
            if (respuesta.statusCode != 200) {
                return respuesta;
            }
            const total = yield this.obtenerTotalRegistros();
            req.body.rol = total.data[0].totalRegistros >= 1 ? this.rolCajero : this.rolAdministrador;
            this.agregar(req.body);
            const pool = yield this.connection.getConnection(this.nombreConexion);
            const consulta = pool.insert(setupInicial_misc_1.opciones_menu).into('opciones_menu');
            console.log(consulta);
            return this.responseHandler(yield consulta);
        });
    }
}
exports.UsuarioModel = UsuarioModel;
