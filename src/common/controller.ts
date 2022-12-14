import { Request } from 'express'
import { Respuesta } from './interfaces/respuesta.interface'
import Model from './model'

export default class Controller {
    modelo!: Model
    public async obtenerTodos(req: Request): Promise<Respuesta> {
        const respuesta = await this.modelo.obtieneTodos()
        return respuesta
    }

    public async obtenerPorId(req: Request): Promise<Respuesta> {
        const id: number = parseInt(req.params.id)
        if (isNaN(id))
            return {
                message: 'El parámetro id debe de ser un número',
                statusCode: 400,
            }

        return await this.modelo.obtenerPorId(id)
    }

    public async eliminarPorId(req: Request): Promise<Respuesta> {
        const id = parseInt(req.params.id)
        if (isNaN(id))
            return {
                message: 'Ocurrió un error',
                statusCode: 400,
                errorMessage: 'El parámetro id, espera un número',
            }
        return await this.modelo.eliminarPorId(id)
    }

    public async agregar(req: Request): Promise<Respuesta> {
        return await this.modelo.agregar(req.body)
    }
    public async actualizarPorId(req: Request): Promise<Respuesta> {
        const id = parseInt(req.params.id)
        return await this.modelo.actualizarPorId(id, req.body)
    }

    public async obtenerTotalRegistros(req: Request): Promise<Respuesta> {
        return await this.modelo.obtenerTotalRegistros()
    }
}
