import { Request, Response, Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import { verificaAutenticacion, verificarToken } from '../../common/middlewares/auth.middleware'
import { UsuarioMantenimientoController } from './usuario.controller'

const router = Router()
const endpoint = '/usuarios'
const controller = new UsuarioMantenimientoController()
router.all('*', verificarToken, verificaAutenticacion)

router.get('/', async (req: Request, res: Response) => {
    const response = await controller.obtenerTodos(req)
    res.status(response.statusCode).json(response)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const response = await controller.eliminarPorId(req)
})
export const usuariosRuta: Ruta = { router, endpoint }
