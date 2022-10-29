import Controller from '../../common/controller'
import { LogsModel } from './logs.model'

export class LogsController extends Controller {
    modelo: LogsModel
    constructor() {
        super()
        this.modelo = new LogsModel()
    }
}
