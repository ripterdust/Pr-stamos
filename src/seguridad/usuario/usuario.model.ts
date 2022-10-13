import { Request } from 'express'
import Model from '../../common/model'
import { atob } from '../../common/utils/crypt.util'

export class UsuarioModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'usuarios'
        this.idTabla = 'usuario_id'
        this.camposTabla = [
            {
                nombre: 'usuario_id',
                descripcion: 'Identificador único del usuario',
                requerido: false,
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

    public async agregarAutenticar(req: Request) {
        req.body.password = atob(req.body.password)
        const respuesta = await this.setupInicial()
        if (respuesta.statusCode != 200) {
            return respuesta
        }
        const total = await this.obtenerTotalRegistros()
        req.body.rol = total.data[0].totalRegistros >= 1 ? 2 : 1

        return this.agregar(req.body)
    }
}
