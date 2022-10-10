import { Request } from 'express'
import Controller from '../../common/controller'
import Condicion from '../../common/interfaces/condicion.interface'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { RespuestaToken } from '../../common/interfaces/respuestaToken.interface'
import { crearToken } from '../../common/utils/auth.util'
import { UsuarioModel } from './usuario.model'
import * as jwt from 'jsonwebtoken'
import { Usuario } from '../../common/interfaces/usuario.interface'

export default class UsuarioController extends Controller {
    modelo!: UsuarioModel
    #secreto: string = 'Secreto'
    constructor() {
        super()
        this.modelo = new UsuarioModel()
    }

    public async autenticar(req: Request): Promise<RespuestaToken | Respuesta> {
        const { mail, password } = req.body
        const user: Usuario = {
            mail,
            password,
        }
        const token = await crearToken(user, this.#secreto, 300)
        return { message: 'Usuario autenticado', statusCode: 200, token }
    }

    public async registrar(req: Request): Promise<RespuestaToken | Respuesta> {
        const resultado = await this.modelo.agregar(req.body)

        let response: RespuestaToken = {
            ...resultado,
            token: '',
        }

        delete response.data

        if (resultado.statusCode != 500) {
            const { mail, password } = req.body
            const user: Usuario = { mail, password }
            const token = await crearToken(user, this.#secreto, 300)
            response.token = token
        }

        return response
    }
}
