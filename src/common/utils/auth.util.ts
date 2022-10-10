import * as jwt from 'jsonwebtoken'
import { Usuario } from '../interfaces/usuario.interface'

export const crearToken = async (usuario: Usuario, secreto: string, tiempoSesion: number) => await jwt.sign(usuario, secreto)
