import { Router } from 'express'

export interface Ruta {
    router: Router
    endpoint: string
}
