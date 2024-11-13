import express from 'express'
import EventController from '../controllers/EventController.js'
import { EventService } from '../services/EventService.js'
import authenticate from '../middlewares/authenticate.js'
import { CodeService } from '../services/CodeService.js'
const router = express.Router()

const eventService = new EventService()
const codeService = new CodeService()
const eventController = new EventController({ eventService, codeService })

router.post('/register', authenticate, (req, res, next) =>
    eventController.register(req, res, next),
)

router.get('/', authenticate, (req, res, next) =>
    eventController.findAll(req, res, next),
)

router.get('/:id', authenticate, (req, res, next) =>
    eventController.find(req, res, next),
)

router.delete('/', authenticate, (req, res, next) => {
    eventController.remove(req, res, next)
})

router.put('/update/:eventId', authenticate, (req, res, next) =>
    eventController.update(req, res, next),
)

export default router
