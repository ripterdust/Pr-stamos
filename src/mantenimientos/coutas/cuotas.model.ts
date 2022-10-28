import Model from '../../common/model'

export class CuotasModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'cuotas'
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
            {
                nombre: 'no_cuota',
                descripcion: 'Número de cuota',
                requerido: true,
            },
        ]
    }

    public async obtieneCuotasPorPrestamoId(id: number) {
        try {
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = pool!.select('*').from(this.nombreTabla).where('prestamo_id', id)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }
}
