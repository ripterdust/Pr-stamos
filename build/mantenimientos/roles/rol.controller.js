"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const rol_model_1 = require("./rol.model");
class RolController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new rol_model_1.RolModel();
    }
}
exports.RolController = RolController;
