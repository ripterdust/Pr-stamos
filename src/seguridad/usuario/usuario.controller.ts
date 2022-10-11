import { Request } from 'express'
import Controller from '../../common/controller'
import Condicion from '../../common/interfaces/condicion.interface'
import { Respuesta } from '../../common/interfaces/respuesta.interface'
import { RespuestaToken } from '../../common/interfaces/respuestaToken.interface'
import { crearToken, verificarToken } from '../../common/utils/auth.util'
import { UsuarioModel } from './usuario.model'
import * as jwt from 'jsonwebtoken'
import { Usuario } from '../../common/interfaces/usuario.interface'
import { atob, insecureDecrypt } from '../../common/utils/crypt.util'

export default class UsuarioController extends Controller {
    modelo!: UsuarioModel
    #secreto: string = 'Secreto'
    constructor() {
        super()
        this.modelo = new UsuarioModel()
    }

    public async autenticar(req: Request): Promise<RespuestaToken | Respuesta> {
        try {
            const noAutenticado: Respuesta = {
                message: 'Usuario no autenticado',
                statusCode: 400,
            }
            let { password } = req.body
            const { correo } = req.body

            if (password) password = atob(password)

            const usuarioEncontrado = await this.obtenerUsuarioAutenticacion(req)
            if (!usuarioEncontrado || !usuarioEncontrado.hasOwnProperty('usuario_id')) {
                return noAutenticado
            }
            const user: Usuario = {
                correo,
                password,
            }
            const token = await crearToken(user, this.#secreto, 300)
            return { message: 'Usuario autenticado', statusCode: 200, token }
        } catch (err) {
            console.log(err)
            return {
                statusCode: 500,
                message: 'Error en el servidor',
            }
        }
    }

    public async registrar(req: Request): Promise<RespuestaToken | Respuesta> {
        const resultado = await this.modelo.agregarAutenticar(req)
        let response: RespuestaToken = {
            ...resultado,
            token: '',
        }

        delete response.data

        if (resultado.statusCode != 500) {
            if (resultado.statusCode === 400) return resultado
            const { correo, password } = req.body
            const user: Usuario = { correo, password }
            const token = await crearToken(user, this.#secreto, 300)
            response.token = token
        }

        return response
    }

    async obtenerUsuarioAutenticacion(req: Request) {
        const { correo, token, app } = req.body
        let { password } = req.body

        if (!token) {
            password = atob(password).trim()

            if (correo == '' || password == '') return false

            const condicionesUsuario: Condicion[] = [
                {
                    campo: 'correo',
                    valor: correo,
                },
            ]
            return this.modelo.buscar(condicionesUsuario).then((res: any) => {
                return res.data?.length > 0 ? res.data[0] : {}
            })
        } else {
            const tokenDesencriptado = insecureDecrypt(token, app)

            const tokenVerificado = await verificarToken(tokenDesencriptado).catch((err: any) => {
                return err
            })

            if (tokenVerificado.error) return false

            delete tokenVerificado.iat
            delete tokenVerificado.exp
            delete tokenVerificado.error

            const payload: Record<string, any> = {}

            for (const k in tokenVerificado) {
                payload[atob(k)] = atob(tokenVerificado[k])
            }

            const { usuarioId } = payload

            return await this.modelo.obtenerPorId(usuarioId).then((res: any) => {
                return res.data?.length > 0 ? res.data[0] : {}
            })
        }
    }
}
