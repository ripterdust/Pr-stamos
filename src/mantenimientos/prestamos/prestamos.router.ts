import { Request, Response, Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import { verificaAutenticacion, verificarToken } from '../../common/middlewares/auth.middleware'
import { PrestamosController } from './prestamos.controller'
const router = Router()
const endpoint = '/prestamos'
const controller = new PrestamosController()
router.all('*', verificarToken, verificaAutenticacion)

router.get('/', async (req: Request, res: Response) => {
    const response = await controller.obtenerTodos(req)
    res.status(response.statusCode).json(response)
})

router.post('/', async (req: Request, res: Response) => {
    const response = await controller.agregar(req)
    return res.status(response.statusCode).json(response)
})

router.get('/todos', async (req: Request, res: Response) => {
    const response = await controller.obtieneTotalidadPrestamos(req)
    return res.status(response.statusCode).json(response)
})

router.get('/recientes', async (req: Request, res: Response) => {
    const response = await controller.obtieneUltimosPrestamos(req)
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
export const prestamosRuta: Ruta = { router, endpoint }
