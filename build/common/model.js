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
const connection_1 = require("./database/connection");
const setupInicial_misc_1 = require("./misc/setupInicial.misc");
const transform_util_1 = require("./utils/transform.util");
class Model {
    constructor() {
        this.nombreCampos = ['*'];
        this.nombreTabla = '';
        this.connection = connection_1.connection;
        this.nombreConexion = '';
        this.idTabla = '';
        this.nombreTabla = '';
        this.camposTabla = [];
    }
    obtieneTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.select(this.nombreCampos).from(this.nombreTabla);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    obtenerTotalRegistros() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.count('* as totalRegistros').from(this.nombreTabla);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    obtenerPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const consulta = pool.select(this.nombreCampos).from(this.nombreTabla).where(this.idTabla, id);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    buscar(condiciones, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                let consulta = pool.select(this.nombreCampos).from(this.nombreTabla).limit(limit);
                consulta = this.agregarCondiciones(condiciones, consulta);
                return this.responseHandler(yield consulta);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    agregar(registro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invalidos = this.validarCampos(registro);
                if (invalidos.length > 0)
                    return {
                        message: 'Campos inválidos',
                        statusCode: 400,
                        errorDetails: invalidos,
                    };
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const resultado = yield pool.insert(registro).into(this.nombreTabla);
                return this.responseHandler(resultado);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    eliminarPorId(id, organizacionSk = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const resultado = yield pool.del().from(this.nombreTabla).where(this.idTabla, id);
                return this.responseHandler([resultado], 'del');
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    actualizarPorId(id, registro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invalidos = this.validarCampos(registro, false);
                if (invalidos.length !== 0)
                    return {
                        message: 'Campos Inválidos',
                        statusCode: 400,
                        errorMessage: 'La estructura del registro no cumple los requisitos mínimos',
                        errorDetails: invalidos,
                    };
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const resultado = yield pool
                    .update(registro)
                    .from(`${this.nombreTabla}`)
                    .where(this.idTabla, id)
                    .returning(this.nombreCampos);
                return this.responseHandler(resultado);
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    setupInicial() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.connection.getConnection(this.nombreConexion);
                const { totalRegistros } = (0, transform_util_1.parseToJson)(yield pool.count('* as totalRegistros').from('roles'))[0];
                if (totalRegistros === 0) {
                    const consulta = pool.insert(setupInicial_misc_1.roles).into('roles').returning('rol_id');
                    return this.responseHandler(yield consulta);
                }
                return {
                    statusCode: 200,
                    message: 'No se creaon registros',
                };
            }
            catch (err) {
                return this.error(err);
            }
        });
    }
    // Métodos privados del modelo
    obtenerCampos() {
        const campos = this.camposTabla.map((campo) => campo.nombre);
        return campos;
    }
    responseHandler(resultado, operacion = 'select') {
        let message = `Registros encontrados en la tabla ${this.nombreTabla}`;
        let statusCode = 200;
        let data = resultado;
        let respuesta = { message, statusCode };
        switch (operacion) {
            case 'select':
                if (resultado.length === 0) {
                    message = 'No se encontraron registros';
                    statusCode = 200;
                    data = resultado;
                }
                respuesta = { message, statusCode, data };
                break;
            case 'multipleUpdate':
                message = `Se han editado los registros de la tabla ${this.nombreTabla} exitosamente`;
                respuesta = { message, statusCode };
                break;
            case 'del':
                if (resultado[0] !== 0) {
                    message = `Se ha eliminado satisfactoriamente el registro ${resultado[0]}`;
                    statusCode = 200;
                }
                else {
                    message = 'El registro que se desea eliminar no existe';
                    statusCode = 404;
                }
                respuesta = { message, statusCode };
                break;
            case 'count':
                message = `Total registros de la tabla ${this.nombreTabla}`;
                data = resultado[0];
                respuesta = { message, statusCode, data };
                break;
            case 'sum':
                message = `Sumatoria de la tabla ${this.nombreTabla}`;
                data = resultado[0];
                respuesta = { message, statusCode, data };
                break;
        }
        return respuesta;
    }
    validarCampos(registro, estricto = true) {
        const camposInvalidos = [];
        this.camposTabla.forEach((campo) => {
            const validaciones = [];
            const existe = typeof registro[campo.nombre] !== 'undefined';
            if (campo.requerido && estricto) {
                if (!existe) {
                    // @ts-ignore
                    validaciones.push({
                        criterioInvalidez: `El ${campo.descripcion} es requerido`,
                        valorEsperado: 'No nulo',
                    });
                }
            }
            if (existe) {
                if (campo.longitudMaxima) {
                    if (registro[campo.nombre].length > campo.longitudMaxima) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: `La longitud máxima del campo es de ${campo.longitudMaxima}`,
                            valorEsperado: `Cadena con menos de ${campo.longitudMaxima} caracteres`,
                        });
                    }
                }
                if (campo.longitudMinima) {
                    if (registro[campo.nombre].length < campo.longitudMinima) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: `La longitud mínima del campo es de ${campo.longitudMinima}`,
                            valorEsperado: `Cadena con más de ${campo.longitudMinima} caracteres`,
                        });
                    }
                }
                if (campo.valorMaximo) {
                    if (registro[campo.nombre] > campo.valorMaximo) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: `El valor máximo del campo es de ${campo.valorMaximo}`,
                            valorEsperado: `Valor menor o igual a ${campo.valorMaximo}`,
                        });
                    }
                }
                if (campo.valorMinimo) {
                    if (registro[campo.nombre] < campo.valorMinimo) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: `El valor mínimo del campo es de ${campo.valorMinimo}`,
                            valorEsperado: `Valor mayor o igual a ${campo.valorMinimo}`,
                        });
                    }
                }
                if (campo.regExp) {
                    const regExp = new RegExp(campo.regExp);
                    if (!regExp.test(registro[campo.nombre])) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: `Este campo debe cumplir con el formato ${campo.regExp}`,
                            valorEsperado: `Cadena de caracteres que cumpla con el formato ${campo.regExp}`,
                        });
                    }
                }
                if (campo.fnValidar) {
                    if (!campo.fnValidar(registro[campo.nombre])) {
                        // @ts-ignore
                        validaciones.push({
                            criterioInvalidez: campo.fnCriterioInvalidez ||
                                'El campo no cumple las condiciones de la función de validadora',
                            valorEsperado: campo.fnValorEsperado || 'Distinto al actual',
                        });
                    }
                }
            }
            if (validaciones.length > 0) {
                camposInvalidos.push({ campo: campo.nombre, validaciones });
            }
        });
        return camposInvalidos;
    }
    agregarCondiciones(condiciones, consulta) {
        condiciones.forEach((condicion) => {
            if (condicion.operador == 'between')
                consulta.whereBetween(condicion.campo, [condicion.valor, condicion.valorComparacion]);
            else
                consulta.where(condicion.campo, condicion.operador || '=', condicion.valor);
        });
        return consulta;
    }
    error(err) {
        const statusCode = 500;
        const message = this.errorSql(err, 'mysql');
        return { statusCode, message };
    }
    errorSql(error, cliente) {
        console.log(error.message);
        const errores = {
            duplicado: 'No es posible insertar un valor duplicado en la tabla.',
            relacionado: 'No es posible eliminar el registro debido a que hay otros relacionados a este.',
            invalido: 'Nombre de columna inválido.',
            noConexion: 'No fue posible conectar con la base de datos.',
            incompletos: 'Campos faltantes o inexistentes.',
            existente: 'Los datos ingresados ya están en la base de datos.',
            faltante: 'Campos faltantes o inválidos.',
            noRelacion: 'El campo al que hace referencia no existe',
        };
        if (cliente === 'mssql') {
            if (error.number === 2627)
                return errores.duplicado;
            if (error.number === 2601)
                return errores.duplicado;
            if (error.number === 547)
                return errores.relacionado;
            if (error.number === 207)
                return errores.invalido;
            if (error.number === 1045)
                return 'No es posible conectar con la base de datos';
        }
        if (cliente == 'mysql') {
            if (error.errno === 1062)
                return errores.duplicado;
            if (error.errno === 1045)
                return errores.noConexion;
            if (error.errno === 1062)
                return errores.existente;
            if (error.errno === 1364)
                return errores.faltante;
            if (error.errno === 1452)
                return errores.faltante;
            if (error.errno === 1451)
                return errores.relacionado;
            if (error.errno === 1452)
                return errores.noRelacion;
        }
        return 'Error de base de datos desconocido';
    }
}
exports.default = Model;
