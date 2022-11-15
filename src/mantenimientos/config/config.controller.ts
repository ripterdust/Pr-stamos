import { Request } from 'express'
import Controller from '../../common/controller'
import { ConfigModel } from './config.model'

export class ConfigController extends Controller {
    modelo: ConfigModel
    constructor() {
        super()
        this.modelo = new ConfigModel()
    }

    public async modificarCaja(req: Request) {
        const dinero = parseInt(req.body.caja)
        console.log(dinero)
        const respuesta = await this.modelo.obtenerPorId(1)
        const { caja } = respuesta.data[0]

        const dineroTotal = caja + dinero

        const consulta = await this.modelo.actualizarPorId(1, { caja: dineroTotal })
        return consulta
    }
}
