import express from 'express'
import CustomerController from '../controllers/CustomerController.js'
import authenticate from '../middlewares/authenticate.js'
import { CustomerService } from '../services/CustomerService.js'
import registerValidator from '../validators/customer/registerValidator.js'
import idValidator from '../validators/customer/idValidator.js'

const router = express.Router()

const customerService = new CustomerService()
const customerController = new CustomerController(customerService)

router.post('/register', authenticate, registerValidator, (req, res, next) =>
    customerController.register(req, res, next),
)

router.get('/', authenticate, (req, res, next) =>
    customerController.find(req, res, next),
)

router.delete('/', authenticate, idValidator, (req, res, next) =>
    customerController.remove(req, res, next),
)

router.put('/update', authenticate, idValidator, (req, res, next) =>
    customerController.update(req, res, next),
)

export default router
