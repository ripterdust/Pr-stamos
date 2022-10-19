import Model from '../../common/model'

export class PrestamosModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'prestamos'
        this.idTabla = 'prestamos_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla de préstamos',
                requerido: false,
            },
        ]
    }
}
