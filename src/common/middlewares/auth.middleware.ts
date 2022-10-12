import { NextFunction, Request, Response } from 'express'
import { Respuesta } from '../interfaces/respuesta.interface'
import * as jwt from 'jsonwebtoken'
// Authorization: Bearer <token>
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
        const token = bearerHeader?.split(' ')[1]
        // @ts-ignore
        req.token = token
        // @ts-ignore
        return next()
    }
    const response: Respuesta = { message: 'Usuario no autenticado', statusCode: 403 }
    return res.status(response.statusCode).json(response)
}

export const verificaAutenticacion = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    jwt.verify(req.token, 'Secreto', (err: any, authData: any) => {
        if (err) {
            const respuesta: Respuesta = { statusCode: 403, message: 'Sesión experidada' }
            return res.status(respuesta.statusCode).json(respuesta)
        }
        return next()
    })
}
