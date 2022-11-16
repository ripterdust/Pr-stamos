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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _UsuarioController_secreto;
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../../common/controller"));
const auth_util_1 = require("../../common/utils/auth.util");
const usuario_model_1 = require("./usuario.model");
const crypt_util_1 = require("../../common/utils/crypt.util");
class UsuarioController extends controller_1.default {
    constructor() {
        super();
        _UsuarioController_secreto.set(this, 'Secreto');
        this.modelo = new usuario_model_1.UsuarioModel();
    }
    autenticar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let noAutenticado = {
                    message: 'Usuario o contraseña incorrectos',
                    statusCode: 400,
                };
                let { password } = req.body;
                const { correo } = req.body;
                if (password)
                    password = (0, crypt_util_1.atob)(password);
                const usuarioEncontrado = yield this.obtenerUsuarioAutenticacion(req);
                if (!usuarioEncontrado || !usuarioEncontrado.hasOwnProperty('usuario_id')) {
                    return noAutenticado;
                }
                if (usuarioEncontrado.password != password) {
                    return noAutenticado;
                }
                const user = {
                    correo,
                    password,
                    rol: usuarioEncontrado.rol,
                    id: usuarioEncontrado.usuario_id,
                };
                const token = yield (0, auth_util_1.crearToken)(user, __classPrivateFieldGet(this, _UsuarioController_secreto, "f"), 300);
                return { message: 'Usuario autenticado', statusCode: 200, token };
            }
            catch (err) {
                return {
                    statusCode: 500,
                    message: 'Error en el servidor',
                };
            }
        });
    }
    registrar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield this.modelo.agregarAutenticar(req);
            let response = Object.assign(Object.assign({}, resultado), { token: '' });
            delete response.data;
            if (resultado.statusCode != 500) {
                if (resultado.statusCode === 400)
                    return resultado;
                const { correo, password } = req.body;
                const id = yield (0, auth_util_1.obtenerUsuarioId)(req);
                const user = { correo, password, id };
                const token = yield (0, auth_util_1.crearToken)(user, __classPrivateFieldGet(this, _UsuarioController_secreto, "f"), 300);
                response.token = token;
            }
            return response;
        });
    }
    obtenerUsuarioAutenticacion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, token, app } = req.body;
            let { password } = req.body;
            if (!token) {
                password = (0, crypt_util_1.atob)(password).trim();
                if (correo == '' || password == '')
                    return false;
                const condicionesUsuario = [
                    {
                        campo: 'correo',
                        valor: correo,
                    },
                ];
                return this.modelo.buscar(condicionesUsuario).then((res) => {
                    var _a;
                    return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.length) > 0 ? res.data[0] : {};
                });
            }
            else {
                const tokenDesencriptado = (0, crypt_util_1.insecureDecrypt)(token, app);
                const tokenVerificado = yield (0, auth_util_1.verificarToken)(tokenDesencriptado).catch((err) => {
                    return err;
                });
                if (tokenVerificado.error)
                    return false;
                delete tokenVerificado.iat;
                delete tokenVerificado.exp;
                delete tokenVerificado.error;
                const payload = {};
                for (const k in tokenVerificado) {
                    payload[(0, crypt_util_1.atob)(k)] = (0, crypt_util_1.atob)(tokenVerificado[k]);
                }
                const { usuarioId } = payload;
                return yield this.modelo.obtenerPorId(usuarioId).then((res) => {
                    var _a;
                    return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.length) > 0 ? res.data[0] : {};
                });
            }
        });
    }
}
exports.default = UsuarioController;
_UsuarioController_secreto = new WeakMap();
