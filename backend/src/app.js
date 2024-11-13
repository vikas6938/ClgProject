import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import router from './routes/index.js'
import connectDb from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { Config } from './config/index.js'

const app = express()

// connect db
connectDb()

// middlewares
app.use(
    cors({
        origin: [Config.CORS_URL],
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to capshare backend service',
    })
})
// auth routes
app.use('/auth', router.auth)
// customer routes
app.use('/customer', router.customer)
// event routes
app.use('/event', router.event)
// folder routes
app.use('/folder', router.folder)
// file routes
app.use('/file', router.file)
// client routes
app.use('/client', router.client)
// image route
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))
// error handler
app.use(errorHandler)

export default app
