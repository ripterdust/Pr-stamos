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
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    obtenerTodos(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield this.modelo.obtieneTodos();
            return respuesta;
        });
    }
    obtenerPorId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return {
                    message: 'El parámetro id debe de ser un número',
                    statusCode: 400,
                };
            return yield this.modelo.obtenerPorId(id);
        });
    }
    eliminarPorId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return {
                    message: 'Ocurrió un error',
                    statusCode: 400,
                    errorMessage: 'El parámetro id, espera un número',
                };
            return yield this.modelo.eliminarPorId(id);
        });
    }
    agregar(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelo.agregar(req.body);
        });
    }
    actualizarPorId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            return yield this.modelo.actualizarPorId(id, req.body);
        });
    }
    obtenerTotalRegistros(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.modelo.obtenerTotalRegistros();
        });
    }
}
exports.default = Controller;
