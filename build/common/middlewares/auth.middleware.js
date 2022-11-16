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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaAutenticacion = exports.verificarToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
// Authorization: Bearer <token>
const verificarToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const token = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(' ')[1];
        // @ts-ignore
        req.token = token;
        // @ts-ignore
        return next();
    }
    const response = { message: 'Usuario no autenticado', statusCode: 403 };
    return res.status(response.statusCode).json(response);
};
exports.verificarToken = verificarToken;
const verificaAutenticacion = (req, res, next) => {
    // @ts-ignore
    jwt.verify(req.token, 'Secreto', (err, authData) => {
        if (err) {
            const respuesta = { statusCode: 403, message: 'Sesión experidada' };
            return res.status(respuesta.statusCode).json(respuesta);
        }
        return next();
    });
};
exports.verificaAutenticacion = verificaAutenticacion;
