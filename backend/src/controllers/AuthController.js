import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'

export class AuthController {
    constructor(userService, logger, tokenService, credentialService) {
        this.userService = userService
        this.logger = logger
        this.tokenService = tokenService
        this.credentialService = credentialService
    }

    async register(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const { name, email, password, studioname } = req.body
        this.logger.debug('new request to register user', {
            name,
            email,
            password: '****',
        })
        try {
            const user = await this.userService.create({
                name,
                email,
                password,
                studioname,
            })

            this.logger.info('user has been created', { id: user.id })

            const payload = {
                sub: user.id,
            }
            const accessToken = this.tokenService.generateAccessToken(payload)

            // persist refresh token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user)

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            })

            res.cookie('accessToken', accessToken, {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.cookie('refreshToken', refreshToken, {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // very important
            })

            res.status(201).json({ user, id: user.id })
        } catch (err) {
            return next(err)
        }
    }

    async login(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const { email, password } = req.body
        this.logger.debug('login request user', {
            email,
            password: '****',
        })

        // Check if email exists in db
        // Compare password
        // Generate Tokens
        // Add tokens to cookies
        // Return the response (id)

        try {
            const user = await this.userService.findByEmail(email)
            if (!user) {
                const error = createHttpError(
                    400,
                    'Email or password does not match',
                )
                return next(error)
            }
            const matchPassword = await this.credentialService.comparePassword(
                password,
                user.password,
            )
            if (!matchPassword) {
                const error = createHttpError(
                    400,
                    'Email or password does not match',
                )
                return next(error)
            }

            const payload = {
                sub: user.id,
            }
            const accessToken = this.tokenService.generateAccessToken(payload)

            // persist refresh token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user)

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            })

            res.cookie('accessToken', accessToken, {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.cookie('refreshToken', refreshToken, {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // very important
            })
            this.logger.info('User has been logged in logged in', {
                id: user.id,
            })
            res.status(200).json({ id: user.id, msg: 'success..' })
        } catch (err) {
            return next(err)
        }
    }

    async self(req, res, next) {
        try {
            const user = await this.userService.findById(req.auth.sub)
            res.json(user)
        } catch (error) {
            return next(error)
        }
    }

    async refresh(req, res, next) {
        try {
            const payload = {
                sub: req.auth.sub,
            }
            const accessToken = this.tokenService.generateAccessToken(payload)
            res.cookie('accessToken', accessToken, {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.json({ id: req.auth.sub })
        } catch (error) {
            this.logger.error(error)
            return next(error)
        }
    }

    async logout(req, res, next) {
        try {
            await this.tokenService.deleteRefreshToken(req.auth.id)
            res.clearCookie('refreshToken', {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.clearCookie('accessToken', {
                // domain: 'localhost',
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60, // 1hr
                httpOnly: true, // very important
            })
            res.json({ msg: req.auth.id })
        } catch (error) {
            this.logger.error(error)
            return next(error)
        }
    }
}
