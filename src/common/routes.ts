import { Ruta } from './interfaces/ruta.interface'
import { Router, Request, Response } from 'express'
import { rutaUsuario } from '../seguridad/usuario/usuario.router'
import { usuariosRuta } from '../mantenimientos/usuarios/usuario.router'

const router = Router()
const endpoint: string = '/'
const rutasGenerales: Ruta = {
    router,
    endpoint,
}

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Bienvenido a su sistema de préstamos',
        status: 200,
        urlApp: 'https://estaeslaurl.com',
    })
})

export const rutas: Ruta[] = [rutasGenerales, rutaUsuario, usuariosRuta]
