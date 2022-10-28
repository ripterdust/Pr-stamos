import Model from '../../common/model'

export class CuotasModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'coutas'
        this.idTabla = 'cuota_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la cuota',
                requerido: false,
            },
            {
                nombre: 'fecha_pago',
                descripcion: 'Fecha de pago de la cuota',
                requerido: true,
            },
            {
                nombre: 'pagado',
                descripcion: 'Indica si la cuota ya se ha pagado o no',
                requerido: true,
            },
            {
                nombre: 'prestamo_id',
                descripcion: 'Identificador del préstamo',
                requerido: true,
            },
        ]
    }
}
