import { Request } from 'express'
import { connection } from './database/connection'
import { Campo } from './interfaces/campo.interface'
import Condicion from './interfaces/condicion.interface'
import { Respuesta } from './interfaces/respuesta.interface'

export default class Model {
    idTabla: string
    nombreCampos: string[] = ['*']
    nombreTabla: string = ''
    camposTabla: Campo[]
    connection = connection
    #nombreConexion: string
    constructor() {
        this.#nombreConexion = ''
        this.idTabla = ''
        this.nombreTabla = ''
        this.camposTabla = []
    }

    public async obtieneTodos(): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            const consulta = pool!.select(this.nombreCampos).from(this.nombreTabla)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.#error(err)
        }
    }

    public async obtenerPorId(id: number): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            const consulta = pool!.select(this.nombreCampos).from(this.nombreTabla).where(this.idTabla, id)

            return this.responseHandler(await consulta)
        } catch (err) {
            return this.#error(err)
        }
    }

    public async buscar(condiciones: Condicion[]): Promise<Respuesta> {
        try {
            const pool = await this.connection.getConnection(this.#nombreConexion)
            let consulta = pool!.select(this.nombreCampos).from(this.nombreTabla)
            consulta = this.#agregarCondiciones(condiciones, consulta)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.#error(err)
        }
    }

    public async agregar(registro: Record<string, any>): Promise<Respuesta> {
        try {
            const invalidos = this.validarCampos(registro)
            console.log(invalidos)
            if (invalidos.length > 0)
                return {
                    message: 'Campos inválidos',
                    statusCode: 400,
                    errorDetails: invalidos,
                }

            const pool = await this.connection.getConnection(this.#nombreConexion)
            const resultado = await pool!.insert(registro).into(this.nombreTabla)

            return this.responseHandler(resultado)
        } catch (err) {
            return this.#error(err)
        }
    }
    // Métodos privados del modelo
    protected obtenerCampos(): string[] {
        const campos: string[] = this.camposTabla.map((campo: Campo) => campo.nombre)

        return campos
    }

    protected responseHandler(resultado: any[], operacion = 'select'): Respuesta {
        let message = `Registros encontrados en la tabla ${this.nombreTabla}`
        let statusCode = 200
        let data: Record<string, any>[] = resultado
        let respuesta: Respuesta = { message, statusCode }
        switch (operacion) {
            case 'select':
                if (resultado.length === 0) {
                    message = 'No se encontraron registros'
                    statusCode = 200
                    data = resultado
                }
                respuesta = { message, statusCode, data }
                break
            case 'multipleUpdate':
                message = `Se han editado los registros de la tabla ${this.nombreTabla} exitosamente`
                respuesta = { message, statusCode }
                break
            case 'del':
                if (resultado[0] !== 0) {
                    message = `Se ha eliminado satisfactoriamente el registro ${resultado[0]}`
                    statusCode = 200
                } else {
                    message = 'El registro que se desea eliminar no existe'
                    statusCode = 404
                }
                respuesta = { message, statusCode }
                break
            case 'count':
                message = `Total registros de la tabla ${this.nombreTabla}`
                data = resultado[0]
                respuesta = { message, statusCode, data }
                break
            case 'sum':
                message = `Sumatoria de la tabla ${this.nombreTabla}`
                data = resultado[0]
                respuesta = { message, statusCode, data }
                break
        }
        return respuesta
    }
    // protected validarCampos(registro: Record<string, any>, estricto: boolean = true) {
    //     const camposInvalidos: any[] = []

    //     this.camposTabla.map((campo: Campo) => {
    //         const validaciones: any[] = []
    //         const existe = typeof registro[campo.nombre] !== 'undefined'
    //         if (campo.requerido && estricto) {
    //             if (!existe) {
    //                 validaciones.push({
    //                     mensaje: `El campo -${campo.nombre}- es requerido`,
    //                 })
    //             }

    //             if (existe) {
    //                 if (campo.longitudMaxima) {
    //                     if (registro[campo.nombre].length > campo.longitudMaxima) {
    //                         validaciones.push({
    //                             mensaje: `La longitud máxima del campo -${campo.nombre}- es de ${campo.longitudMaxima}`,
    //                         })
    //                     }
    //                 }
    //                 if (campo.longitudMinima) {
    //                     if (registro[campo.nombre].length > campo.longitudMinima) {
    //                         validaciones.push({
    //                             mensaje: `La longitud Mínima del campo -${campo.nombre}- es de ${campo.longitudMinima}`,
    //                         })
    //                     }
    //                 }
    //             }
    //         }
    //     })

    //     return camposInvalidos
    // }

    protected validarCampos(registro: Record<string, any>, estricto: boolean = true) {
        const camposInvalidos: any[] = []
        this.camposTabla.forEach((campo) => {
            const validaciones = []
            const existe = typeof registro[campo.nombre] !== 'undefined'
            if (campo.requerido && estricto) {
                if (!existe) {
                    validaciones.push({
                        criterioInvalidez: `El ${campo.descripcion} es requerido`,
                        valorEsperado: 'No nulo',
                    })
                }
            }
            if (existe) {
                if (campo.longitudMaxima) {
                    if (registro[campo.nombre].length > campo.longitudMaxima) {
                        validaciones.push({
                            criterioInvalidez: `La longitud máxima del campo es de ${campo.longitudMaxima}`,
                            valorEsperado: `Cadena con menos de ${campo.longitudMaxima} caracteres`,
                        })
                    }
                }
                if (campo.longitudMinima) {
                    if (registro[campo.nombre].length < campo.longitudMinima) {
                        validaciones.push({
                            criterioInvalidez: `La longitud mínima del campo es de ${campo.longitudMinima}`,
                            valorEsperado: `Cadena con más de ${campo.longitudMinima} caracteres`,
                        })
                    }
                }
                if (campo.valorMaximo) {
                    if (registro[campo.nombre] > campo.valorMaximo) {
                        validaciones.push({
                            criterioInvalidez: `El valor máximo del campo es de ${campo.valorMaximo}`,
                            valorEsperado: `Valor menor o igual a ${campo.valorMaximo}`,
                        })
                    }
                }
                if (campo.valorMinimo) {
                    if (registro[campo.nombre] < campo.valorMinimo) {
                        validaciones.push({
                            criterioInvalidez: `El valor mínimo del campo es de ${campo.valorMinimo}`,
                            valorEsperado: `Valor mayor o igual a ${campo.valorMinimo}`,
                        })
                    }
                }
                if (campo.regExp) {
                    const regExp = new RegExp(campo.regExp)
                    if (!regExp.test(registro[campo.nombre])) {
                        validaciones.push({
                            criterioInvalidez: `Este campo debe cumplir con el formato ${campo.regExp}`,
                            valorEsperado: `Cadena de caracteres que cumpla con el formato ${campo.regExp}`,
                        })
                    }
                }
                if (campo.fnValidar) {
                    if (!campo.fnValidar(registro[campo.nombre])) {
                        validaciones.push({
                            criterioInvalidez: campo.fnCriterioInvalidez || 'El campo no cumple las condiciones de la función de validadora',
                            valorEsperado: campo.fnValorEsperado || 'Distinto al actual',
                        })
                    }
                }
            }
            if (validaciones.length > 0) {
                camposInvalidos.push({ campo: campo.nombre, validaciones })
            }
        })
        return camposInvalidos
    }

    #agregarCondiciones(condiciones: Condicion[], consulta: any) {
        condiciones.map((condicion: Condicion) => {
            if (condicion.operador == 'between') consulta.whereBetween(condicion.campo, [condicion.valor, condicion.valorComparacion])
            else consulta.where(condicion.campo, condicion.operador || '=', condicion.valor)
        })
        return consulta
    }

    #error(err: any): Respuesta {
        const statusCode: number = 500
        const message: string = this.#errorSql(err, 'mysql')
        return { statusCode, message }
    }

    #errorSql(error: Record<string, any>, cliente: string): string {
        const errores = {
            duplicado: 'No es posible insertar un valor duplicado en la tabla',
            relacionado: 'No es posible eliminar el registro debido a que hay otros relacionados a este',
            invalido: 'Nombre de columna inválido',
            noConexion: 'No fue posible conectar con la base de datos',
            incompletos: 'Campos faltantes o inexistentes',
        }
        if (cliente === 'mssql') {
            if (error.number === 2627) return errores.duplicado
            if (error.number === 2601) return errores.duplicado
            if (error.number === 547) return errores.relacionado
            if (error.number === 207) return errores.invalido
            if (error.number === 1045) return 'No es posible conectar con la base de datos'
        }
        if (cliente == 'mysql') {
            if (error.errno === 1062) return errores.duplicado
            if (error.number === 1045) return errores.noConexion
        }
        return 'Error de base de datos desconocido'
    }
}
