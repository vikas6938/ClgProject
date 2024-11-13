import createHttpError from 'http-errors'

export default class EventController {
    constructor({ eventService, codeService }) {
        this.eventService = eventService
        this.codeService = codeService
    }
    async register(req, res, next) {
        try {
            const { name, customerId } = req.body

            let code
            let isEvent = true
            while (isEvent) {
                code = this.codeService.generateCode()
                const event = await this.eventService.findByCode(code)
                if (!event) {
                    isEvent = false
                    break
                }
            }

            const event = await this.eventService.create({
                name,
                customerId,
                userId: req.auth.sub,
                accessCode: code,
            })
            res.status(201).json({
                id: event._id,
                name: event.name,
                customerId: event.customerId,
                accessCode: event.accessCode,
            })
        } catch (error) {
            console.log(error)
            const err = createHttpError(500, 'error while registering event')
            return next(err)
        }
    }
    async findAll(req, res, next) {
        try {
            const events = await this.eventService.findAll(req.auth.sub)
            res.status(200).json(events)
        } catch (error) {
            return next()
        }
    }
    async find(req, res, next) {
        try {
            const { id } = req.params
            const event = await this.eventService.find(id)
            res.status(200).json(event)
        } catch (error) {
            return next()
        }
    }
    async remove(req, res, next) {
        try {
            const events = await this.eventService.removeEvent(
                req.body.id,
                req.auth.sub,
            )
            res.status(200).json(events)
        } catch (error) {
            return next()
        }
    }
    async update(req, res) {
        // const folderId = req.params.folderid
        const { eventId } = req.params
        const data = req.body
        const files = await this.eventService.update(eventId, data)
        res.json({ data: files })
    }
}
