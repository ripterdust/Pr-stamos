import Model from '../../common/model'

export class OpcionesMenuModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'opciones_menu'
        this.idTabla = 'opcion_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de la opción de menú',
                requerido: false,
            },
            {
                nombre: 'nombre',
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
}
