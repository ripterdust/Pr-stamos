import Controller from '../../common/controller'
import { PrestamosModel } from './prestamos.model'

export class PrestamosController extends Controller {
    modelo: PrestamosModel
    constructor() {
        super()
        this.modelo = new PrestamosModel()
    }
}
