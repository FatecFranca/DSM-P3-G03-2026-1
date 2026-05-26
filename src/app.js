import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import relatoRoutes from './routes/relatos.js'
import usuarioRoutes from './routes/usuarios.js'


const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/relatos', relatoRoutes)
app.use('/usuarios', usuarioRoutes)


export default app
