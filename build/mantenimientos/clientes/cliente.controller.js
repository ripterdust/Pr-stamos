"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const cliente_model_1 = require("./cliente.model");
class ClienteController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new cliente_model_1.ClienteModel();
    }
}
exports.ClienteController = ClienteController;
