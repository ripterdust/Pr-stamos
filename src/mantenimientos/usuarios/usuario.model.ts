import Model from '../../common/model'

export class UsuarioMantenimientoModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'usuarios'
        this.nombreCampos = this.obtenerCampos()
        this.idTabla = 'usuario_id'
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador de el usuario',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de usuario',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo electrónico del usuario',
                requerido: true,
            },
            {
                nombre: 'rol',
                descripcion: 'Rol del usuario',
                requerido: true,
            },
        ]
    }
}
