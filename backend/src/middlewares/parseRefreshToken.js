import { expressjwt } from 'express-jwt'
import { Config } from '../config/index.js'
import createHttpError from 'http-errors'

export default expressjwt({
    secret: Config.REFRESH_TOKEN_SECRET,
    algorithms: ['HS256'],
    getToken(req) {
        try {
            const { refreshToken } = req.cookies
            return refreshToken
        } catch (error) {
            const err = createHttpError(401, error)
            throw err
        }
    },
})
