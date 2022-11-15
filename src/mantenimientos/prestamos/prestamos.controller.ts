import Controller from '../../common/controller'
import { Request } from 'express'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { PrestamosModel } from './prestamos.model'
import { obtenerUsuarioId } from '../../common/utils/auth.util'
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

    public async nuevoPrestamo(req: Request): Promise<Respuesta> {
        const id = await obtenerUsuarioId(req)

        req.body.prestamista_id = id
        const { cuotas } = req.body

        const respuesta = await this.modelo.nuevoPrestamo(req.body, cuotas)

        if (respuesta.statusCode === 200) {
            const crearLog = await this.modelo.crearLogs(req.body.cantidad)
        }
        return respuesta
    }
}
