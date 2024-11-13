import express from 'express'
import ClientController from '../controllers/ClientController.js'
const router = express.Router()

const clientService = new ClientController()

router.post('/', (req, res, next) => clientService.find(req, res, next))

export default router
