import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import relatoRoutes from './routes/relatos.js'
import usuarioRoutes from './routes/usuarios.js'
import transtornosRoutes from './routes/transtornos.js'
import instituicoesRoutes from './routes/instituicoes.js'
import profissionaisRoutes from './routes/profissionais.js'
import especialidadesRoutes from './routes/especialidades.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors()) 


app.use('/relatos', relatoRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/transtornos', transtornosRoutes)
app.use('/instituicoes', instituicoesRoutes)
app.use('/profissionais', profissionaisRoutes)
app.use('/especialidades', especialidadesRoutes)

export default app
