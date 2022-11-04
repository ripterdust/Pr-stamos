import Model from '../../common/model'

export class ConfigModel extends Model {
    constructor() {
        super()
        this.idTabla = 'config_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla de config',
                requerido: false,
            },
            {
                nombre: 'caja',
                descripcion: 'Cantidad en caja',
                requerido: false,
            },
            {
                nombre: 'moneda',
                descripcion: 'Moneda de la caja',
                requerido: false,
            },
        ]
    }
}
