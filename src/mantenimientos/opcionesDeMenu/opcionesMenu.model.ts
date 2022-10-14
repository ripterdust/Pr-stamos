import { Respuesta } from '../../common/interfaces/respuesta.interface'
import Model from '../../common/model'

export class OpcionesMenuModel extends Model {
    nombreOpcion: string
    constructor() {
        super()
        this.nombreTabla = 'opciones_menu'
        this.idTabla = 'opcion_id'
        this.nombreOpcion = 'nombre'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la opción de menú',
                requerido: false,
            },
            {
                nombre: this.nombreOpcion,
                descripcion: 'Nombre de la opción',
                requerido: true,
            },
            {
                nombre: 'rol_id',
                descripcion: 'Identificador del rol',
                requerido: true,
            },
        ]
        this.nombreCampos = this.obtenerCampos()
    }
    public async obtenerOpciones(rolId: number): Promise<Respuesta> {
        try {
            console.log('opciones')
            const pool = await this.connection.getConnection(this.nombreConexion)
            const consulta = pool!.select(this.nombreOpcion).from(this.nombreTabla).where('rol_id', rolId)
            return this.responseHandler(await consulta)
        } catch (err) {
            console.log(err)
            return this.error(err)
        }
    }
}
