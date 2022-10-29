import Controller from '../../common/controller'
import { Request } from 'express'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { PrestamosModel } from './prestamos.model'
export class PrestamosController extends Controller {
    modelo: PrestamosModel
    constructor() {
        super()
        this.modelo = new PrestamosModel()
    }

    public async obtieneTotalidadPrestamos(req: Request): Promise<Respuesta> {
        const data = await this.modelo.obtienePrestamos()
        return {
            statusCode: 200,
            message: 'Todos los registro de los préstamos',
            data,
        }
    }

    public async obtieneUltimosPrestamos(req: Request): Promise<Respuesta> {
        const respuesta = await this.modelo.prestamosRecientes()
        return respuesta
    }
}
