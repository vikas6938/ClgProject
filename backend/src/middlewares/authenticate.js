import { expressjwt } from 'express-jwt'
import { Config } from '../config/index.js'
import createHttpError from 'http-errors'

export default expressjwt({
    secret: Config.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
    getToken(req) {
        try {
            const authHeader = req.headers.authorization
            if (authHeader && authHeader.split(' ')[1] !== 'undefined') {
                const token = authHeader.split(' ')[1]
                if (token) {
                    return token
                }
            }

            const { accessToken } = req.cookies
            return accessToken
        } catch (error) {
            const err = createHttpError(401, error)
            throw err
        }
    },
})
