import express, { Request, Response } from 'express'
import { Ruta } from './common/interfaces/ruta.interface'
import { rutas } from './common/routes'
import { Respuesta } from './common/interfaces/respuesta.interface'
// Initilializations
const app = express()

// Config
app.set('port', process.env.PORT || 8000)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routers
rutas.map((ruta: Ruta) => app.use(ruta.endpoint, ruta.router))

app.use('*', (req: Request, res: Response) => {
    const respuesta: Respuesta = {
        statusCode: 404,
        message: 'Recurso no encontrado',
    }
})
// Listening
app.listen(app.get('port'), () => console.log(`App running on port ${app.get('port')}`))
