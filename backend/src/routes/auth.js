import express from 'express'
import { AuthController } from '../controllers/AuthController.js'
import registerValidator from '../validators/user/registerValidator.js'
import logger from '../config/logger.js'
import { UserService } from '../services/UserService.js'
import { TokenService } from '../services/TokenService.js'
import loginValidator from '../validators/user/loginValidator.js'
import { CredentialService } from '../services/CredentialService.js'
import authenticate from '../middlewares/authenticate.js'
import validateRefreshToken from '../middlewares/validateRefreshToken.js'
import parseRefreshToken from '../middlewares/parseRefreshToken.js'

const router = express.Router()

const userService = new UserService()
const tokenService = new TokenService()
const credentialService = new CredentialService()
const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService,
) //passing dependency injection

router.post('/register', registerValidator, (req, res, next) =>
    authController.register(req, res, next),
)

router.post('/login', loginValidator, (req, res, next) =>
    authController.login(req, res, next),
)

router.get('/self', authenticate, (req, res, next) =>
    authController.self(req, res, next),
)

router.post('/refresh', validateRefreshToken, (req, res, next) =>
    authController.refresh(req, res, next),
)

router.post('/logout', authenticate, parseRefreshToken, (req, res, next) =>
    authController.logout(req, res, next),
)

export default router
