"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarioRol = exports.obtenerUsuarioId = exports.verificarToken = exports.crearToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const crearToken = (usuario, secreto, tiempoSesion) => __awaiter(void 0, void 0, void 0, function* () { return yield jwt.sign(usuario, secreto); });
exports.crearToken = crearToken;
const verificarToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'Secreto', (err, payload) => {
            if (err)
                return reject(Object.assign(Object.assign({}, err), { error: true }));
            if (typeof payload !== 'undefined' && typeof payload !== 'string')
                return resolve(Object.assign(Object.assign({}, payload), { error: false }));
        });
    });
};
exports.verificarToken = verificarToken;
const obtenerUsuarioId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const token = ((_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || ' ';
    const usuario = yield (0, exports.verificarToken)(token).catch((err) => {
        return err;
    });
    if (typeof usuario != 'string' && usuario.id)
        return parseInt(usuario.id);
    return 0;
});
exports.obtenerUsuarioId = obtenerUsuarioId;
const obtenerUsuarioRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // @ts-ignore
    const token = ((_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || ' ';
    const usuario = yield (0, exports.verificarToken)(token).catch((err) => {
        return err;
    });
    if (typeof usuario != 'string' && usuario.rol)
        return parseInt(usuario.rol);
    return 0;
});
exports.obtenerUsuarioRol = obtenerUsuarioRol;
