import { Request } from 'express'
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

export const obtenerUsuarioId = async (req: Request) => {
    // @ts-ignore
    const token = req.header('Authorization')?.split(' ')[1] || ' '
    const usuario = await verificarToken(token).catch((err) => {
        return err
    })
    if (typeof usuario != 'string' && usuario.id) return parseInt(usuario.id)
    return 0
}

export const obtenerUsuarioRol = async (req: Request) => {
    // @ts-ignore
    const token = req.header('Authorization')?.split(' ')[1] || ' '
    const usuario = await verificarToken(token).catch((err) => {
        return err
    })
    if (typeof usuario != 'string' && usuario.rol) return parseInt(usuario.rol)
    return 0
}
