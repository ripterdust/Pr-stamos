import Model from '../../common/model'

export class RolModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'roles'
        this.idTabla = 'rol_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador del rol',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre del rol',
                requerido: true,
            },
        ]
        this.nombreCampos = this.obtenerCampos()
    }
}
