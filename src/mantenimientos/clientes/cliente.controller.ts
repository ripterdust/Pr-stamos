import Controller from '../../common/controller'
import { ClienteModel } from './cliente.model'

export class ClienteController extends Controller {
    modelo: ClienteModel
    constructor() {
        super()
        this.modelo = new ClienteModel()
    }
}
