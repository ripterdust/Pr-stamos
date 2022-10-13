import Controller from '../../common/controller'
import { OpcionesMenuModel } from './opcionesMenu.model'

export class OpcionesMenuController extends Controller {
    modelo: OpcionesMenuModel
    constructor() {
        super()
        this.modelo = new OpcionesMenuModel()
    }
}
