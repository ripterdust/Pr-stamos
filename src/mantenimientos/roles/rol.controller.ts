import Controller from '../../common/controller'
import { RolModel } from './rol.model'

export class RolController extends Controller {
    modelo: RolModel
    constructor() {
        super()
        this.modelo = new RolModel()
    }
}
