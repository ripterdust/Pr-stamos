import Controller from '../../common/controller'
import { MonedaModel } from './monedas.model'

export class MonedaController extends Controller {
    modelo: MonedaModel
    constructor() {
        super()
        this.modelo = new MonedaModel()
    }
}
