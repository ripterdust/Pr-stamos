import Model from '../../common/model'
import { Request } from 'express'
import { Cuotas } from '../../common/interfaces/cuotas.interface'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
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

    public async prestamosRecientes() {
        try {
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = pool!
                .select([
                    'clientes.nombre as cliente',
                    'prestamos.cantidad',
                    'prestamos.cuotas',
                    'usuarios.nombre as prestamista',
                    'prestamos.fecha_creacion',
                ])
                .from(this.nombreTabla)
                .leftJoin('clientes', `${this.nombreTabla}.cliente_id`, 'clientes.cliente_id')
                .leftJoin('usuarios', `${this.nombreTabla}.prestamista_id`, 'usuarios.usuario_id')
                .limit(10)
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }

    public async nuevoPrestamo(req: any, noCuotas: number) {
        try {
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = await this.agregar(req)
            const idPrestamo: number = consulta.data[0]
            const { cantidad, interes } = req

            const respuestaCuotas: Respuesta = await this.crearCuotas(cantidad, interes, noCuotas, idPrestamo)
            respuestaCuotas.data.pop()
            respuestaCuotas.data.push(consulta.data[0])
            return respuestaCuotas
        } catch (err) {
            return this.error(err)
        }
    }

    public async crearCuotas(
        cantidad: number,
        interes: number,
        noCuotas: number = 12,
        prestamo_id: number
    ): Promise<Respuesta> {
        const cuotas: Cuotas[] = []
        const totalidadPorcentaje = 100
        const cantidadConInteres = (cantidad / totalidadPorcentaje) * (totalidadPorcentaje + interes)
        for (let no_cuota = 1; no_cuota <= noCuotas; no_cuota++) {
            cuotas.push({
                pagado: false,
                no_cuota,
                prestamo_id,
                fecha_pago: new Date(new Date().setMonth(new Date().getMonth() + no_cuota)),
                cantidad: cantidadConInteres / noCuotas,
            })
        }
        const consulta = await this.insertarCuotas(cuotas)
        return consulta
    }

    public async insertarCuotas(cuotas: Cuotas[]) {
        try {
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = pool!.insert(cuotas).into('cuotas')
            return this.responseHandler(await consulta)
        } catch (err) {
            return this.error(err)
        }
    }
}
