import Controller from '../../common/controller'
import { CuotasModel } from './cuotas.model'

export class CuotasController extends Controller {
    modelo: CuotasModel
    constructor() {
        super()
        this.modelo = new CuotasModel()
    }
}
