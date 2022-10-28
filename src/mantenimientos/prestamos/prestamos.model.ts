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
            {
                nombre: 'cuotas',
                descripcion: 'Cuotas del préstamo',
                requerido: true,
            },
        ]
    }

    public async obtienePrestamos() {
        try {
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = pool!
                .select([
                    'prestamos.prestamo_id',
                    'clientes.nombre as nombre_cliente',
                    'prestamos.cuotas',
                    'prestamos.cantidad',
                    'prestamos.interes',
                    'prestamos.fecha_creacion',
                    'usuarios.nombre as prestamista',
                ])
                .from(this.nombreTabla)
                .leftJoin('clientes', `${this.nombreTabla}.cliente_id`, 'clientes.cliente_id')
                .leftJoin('usuarios', `${this.nombreTabla}.prestamista_id`, 'usuarios.usuario_id')

            return consulta
        } catch (err) {
            return this.error(err)
        }
    }
}
