import mongoose from 'mongoose'
import { Config } from './index.js'
import logger from './logger.js'

const connectDb = async () => {
    const url = Config.DB_URL
    try {
        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000,
        })
        const connection = mongoose.connection
        return connection
    } catch (err) {
        logger.error(err)
        process.exit(1)
    }
}

export default connectDb
