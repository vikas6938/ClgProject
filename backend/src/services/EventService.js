import createHttpError from 'http-errors'
import eventModel from '../models/eventModel.js'
import fileModel from '../models/fileModel.js'

export class EventService {
    async create({ name, customerId, userId, accessCode }) {
        const event = eventModel({ name, customerId, userId, accessCode })
        const data = await event.save()
        return data
    }
    async findAll(id) {
        const events = await eventModel
            .find({ userId: id })
            .select('-updatedAt -__v -createdAt')
            .populate({
                path: 'customerId',
                select: '-updatedAt -__v -createdAt',
            })
        return events
    }
    async find(id) {
        const event = await eventModel
            .findOne({ _id: id })
            .select('-updatedAt -__v -createdAt')
        return event
    }
    async removeEvent(id) {
        await eventModel.deleteOne({ _id: id })
        await fileModel.deleteMany({ eventId: id })
        return
    }
    async findByCode(code) {
        const event = await eventModel.findOne({ accessCode: code })
        return event
    }
    async update(eventId, data) {
        try {
            const files = await eventModel.findByIdAndUpdate(eventId, data, {
                new: true,
            })
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to update data in database',
            )
            throw error
        }
    }
}
