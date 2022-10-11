import * as jwt from 'jsonwebtoken'
import { Usuario } from '../interfaces/usuario.interface'

export const crearToken = async (usuario: Usuario, secreto: string, tiempoSesion: number) => await jwt.sign(usuario, secreto)

export const verificarToken = (token: string) => {
    return new Promise<Record<string, any>>((resolve, reject) => {
        jwt.verify(token, 'Secreto', (err, payload) => {
            if (err) return reject({ ...err, error: true })
            if (typeof payload !== 'undefined' && typeof payload !== 'string') return resolve({ ...payload, error: false })
        })
    })
}
