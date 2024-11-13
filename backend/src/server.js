import app from './app.js'
import { Config } from './config/index.js'
import logger from './config/logger.js'

const startServer = async () => {
    const PORT = Config.PORT
    try {
        app.listen(PORT, () => {
            logger.info(`listening on PORT ${PORT}`)
        })
    } catch (error) {
        logger.error(error.message)
        setTimeout(() => {
            process.exit(1)
        }, 1000)
    }
}
startServer()
