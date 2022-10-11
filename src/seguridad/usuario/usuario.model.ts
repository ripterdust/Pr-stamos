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
            {
                nombre: 'nombre',
                descripcion: 'Nombre de usuario',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo del usuario',
                requerido: true,
            },
            {
                nombre: 'password',
                descripcion: 'Contraseña del usuario',
                requerido: true,
            },
            {
                nombre: 'rol',
                descripcion: 'Rol del usuario',
                requerido: false,
            },
        ]
        this.nombreCampos = this.obtenerCampos()
    }
}
