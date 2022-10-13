import { Request } from 'express'
import Controller from '../../common/controller'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { obtenerUsuarioRol } from '../../common/utils/auth.util'
import { OpcionesMenuModel } from './opcionesMenu.model'

export class OpcionesMenuController extends Controller {
    modelo: OpcionesMenuModel
    constructor() {
        super()
        this.modelo = new OpcionesMenuModel()
    }

    public async obtenerOpciones(req: Request): Promise<Respuesta> {
        const rolId: number = await obtenerUsuarioRol(req)
        return this.modelo.obtenerOpciones(rolId)
    }
}
