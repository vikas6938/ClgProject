import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) })

const {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_URL,
    APP_URL,
    CORS_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = process.env

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_URL,
    APP_URL,
    CORS_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
}
