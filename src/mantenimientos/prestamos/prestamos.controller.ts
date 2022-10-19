import Controller from '../../common/controller'
import { PrestamosModel } from './prestamos.model'
export class PrestamosController extends Controller {
    model!: PrestamosModel

    constructor() {
        super()
        this.model = new PrestamosModel()
    }
}
