import Model from '../../common/model'

export class UsuarioModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'usuarios'
        this.idTabla = 'usuario_id'
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador único del usuario',
                requerido: true,
            },
        ]
        this.nombreCampos = this.obtenerCampos()
    }
}
