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
exports.OpcionesMenuController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const auth_util_1 = require("../../common/utils/auth.util");
const opcionesMenu_model_1 = require("./opcionesMenu.model");
class OpcionesMenuController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new opcionesMenu_model_1.OpcionesMenuModel();
    }
    obtenerOpciones(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rolId = yield (0, auth_util_1.obtenerUsuarioRol)(req);
            return this.modelo.obtenerOpciones(rolId);
        });
    }
}
exports.OpcionesMenuController = OpcionesMenuController;
