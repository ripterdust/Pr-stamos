import { Router } from 'express'
import { Ruta } from '../../common/interfaces/ruta.interface'
import { CuotasController } from './cuotas.controller'

const router = Router()
const controller = new CuotasController()
const endpoint = '/cuotas'

export const cuotasRuta: Ruta = {
    router,
    endpoint,
}
