import jwt from 'jsonwebtoken'
import { Config } from '../config/index.js'
import refreshTokenModel from '../models/refreshTokenModel.js'
import logger from '../config/logger.js'

export class TokenService {
    generateAccessToken(payload) {
        const accessToken = jwt.sign(payload, Config.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h',
        })
        return accessToken
    }

    generateRefreshToken(payload) {
        const refreshToken = jwt.sign(payload, Config.REFRESH_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1y',
            jwtid: String(payload.id),
        })
        return refreshToken
    }

    async persistRefreshToken(user) {
        const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365 //1y
        const refreshToken = refreshTokenModel({
            userId: user.id,
            expiresAt: new Date(Date.now() + MS_IN_YEAR),
        })
        const newRefreshToken = await refreshToken.save()
        return newRefreshToken
    }

    async deleteRefreshToken(id) {
        await refreshTokenModel.deleteOne({ _id: id })
        logger.info('Refresh token has been deleted', { id })
    }
}
