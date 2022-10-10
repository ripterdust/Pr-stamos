import { Request, Response, Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import UsuarioController from './usuario.controller'

const router = Router()
const endpoint = '/usuario'
const controller = new UsuarioController()

router.post('/autenticar', async (req: Request, res: Response) => {
    const response = await controller.autenticar(req)
    res.status(response.statusCode).json(response)
})

router.post('/registrar', async (req: Request, res: Response) => {
    const response = await controller.registrar(req)
    res.status(response.statusCode).json(response)
})

// Exportando la ruta
export const rutaUsuario: Ruta = {
    router,
    endpoint,
}
