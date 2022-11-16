"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModel = void 0;
const model_1 = __importDefault(require("../../common/model"));
class LogsModel extends model_1.default {
    constructor() {
        super();
        this.nombreTabla = 'logs';
    }
}
exports.LogsModel = LogsModel;
