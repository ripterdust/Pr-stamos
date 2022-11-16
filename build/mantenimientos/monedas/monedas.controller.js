"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonedaController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const monedas_model_1 = require("./monedas.model");
class MonedaController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new monedas_model_1.MonedaModel();
    }
}
exports.MonedaController = MonedaController;
