import { Request, Response, Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import { verificaAutenticacion, verificarToken } from '../../common/middlewares/auth.middleware'
import { obtenerUsuarioId } from '../../common/utils/auth.util'
import { atob } from '../../common/utils/crypt.util'
import { ClienteController } from './cliente.controller'

const router = Router()
const endpoint = '/clientes'
const controller = new ClienteController()
router.all('*', verificarToken, verificaAutenticacion)

router.get('/', async (req: Request, res: Response) => {
    const response = await controller.obtenerTodos(req)
    res.status(response.statusCode).json(response)
})

router.post('/', async (req: Request, res: Response) => {
    const id = await obtenerUsuarioId(req)
    req.body.prestamista_id = id
    const response = await controller.agregar(req)
    return res.status(response.statusCode).json(response)
})

router.get('/:id', async (req: Request, res: Response) => {
    const response = await controller.obtenerPorId(req)
    return res.status(response.statusCode).json(response)
})

router.post('/edit/:id', async (req: Request, res: Response) => {
    const response = await controller.actualizarPorId(req)
    return res.status(response.statusCode).json(response)
})
router.delete('/:id', async (req: Request, res: Response) => {
    const response = await controller.eliminarPorId(req)
    return res.status(response.statusCode).json(response)
})
export const clientesRuta: Ruta = { router, endpoint }
