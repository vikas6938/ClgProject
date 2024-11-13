import winston from 'winston'
import { Config } from './index.js'

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        serviceName: 'hackathon-backend',
    },
    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'combine.log',
            level: 'info',
            silent: Config.NODE_ENV === 'test',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
            silent: Config.NODE_ENV === 'test',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: Config.NODE_ENV === 'test',
        }),
    ],
})

export default logger
