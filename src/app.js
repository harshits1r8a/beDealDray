import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { limit } from './constant.js'
import userRouter from './routes/user.router.js'

import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

// Middilewares

// CORS orizon
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials:true,
    preflightContinue: false
}))

app.use(express.json({limit:limit}))
app.use(express.urlencoded({extended:true, limit:limit}))
app.use(express.static("public"))//public means public file
app.use(cookieParser())


// ROUTES OF 3 MODULES
app.use('/api/v1/user', userRouter)



// ERROR DESIGN
app.use(errorMiddleware);

export { app }