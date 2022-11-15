import Controller from '../../common/controller'
import { ConfigModel } from './config.model'

export class ConfigController extends Controller {
    modelo: ConfigModel
    constructor() {
        super()
        this.modelo = new ConfigModel()
    }
}
