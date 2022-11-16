"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsController = void 0;
const controller_1 = __importDefault(require("../../common/controller"));
const logs_model_1 = require("./logs.model");
class LogsController extends controller_1.default {
    constructor() {
        super();
        this.modelo = new logs_model_1.LogsModel();
    }
}
exports.LogsController = LogsController;
