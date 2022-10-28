import Model from '../../common/model'

export class PrestamosModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'prestamos'
        this.idTabla = 'prestamo_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la tabla préstamos',
                requerido: false,
            },
            {
                nombre: 'fecha_creacion',
                descripcion: 'Fecha de creación del préstamo',
                requerido: false,
            },
            {
                nombre: 'cantidad',
                descripcion: 'Cantidad del préstamo',
                requerido: true,
            },
            {
                nombre: 'tipo_id',
                descripcion: 'Identificador del tipo de préstamo',
                requerido: true,
            },
        ]
    }
}
