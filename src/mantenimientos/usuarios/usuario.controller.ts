import Controller from '../../common/controller'
import { UsuarioMantenimientoModel } from './usuario.model'

export class UsuarioMantenimientoController extends Controller {
    modelo: UsuarioMantenimientoModel
    constructor() {
        super()
        this.modelo = new UsuarioMantenimientoModel()
    }
}
