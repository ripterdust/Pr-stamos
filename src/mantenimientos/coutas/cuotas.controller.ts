import { Request } from 'express'
import Controller from '../../common/controller'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { CuotasModel } from './cuotas.model'

export class CuotasController extends Controller {
    modelo: CuotasModel
    constructor() {
        super()
        this.modelo = new CuotasModel()
    }

    public async obtenerPorPrestamoId(req: Request): Promise<Respuesta> {
        try {
            const respuesta = await this.modelo.obtieneCuotasPorPrestamoId(parseInt(req.params.id))
            return respuesta
        } catch (err) {
            return {
                statusCode: 500,
                message: 'Error desconocido en el servidor',
            }
        }
    }
}
