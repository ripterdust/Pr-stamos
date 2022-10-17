import Model from '../../common/model'

export class MonedaModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'monedas'
        this.idTabla = 'moneda_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la Moneda',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de la Moneda',
                requerido: true,
            },
            {
                nombre: 'prefix',
                descripcion: 'Prefijo de la Moneda',
                requerido: true,
            }
        ]
        this.nombreCampos = this.obtenerCampos()
    }
}
