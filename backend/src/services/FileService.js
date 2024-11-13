import createHttpError from 'http-errors'
import fileModel from '../models/fileModel.js'
import eventModel from '../models/eventModel.js'

export class FileService {
    async store(file) {
        try {
            const files = await fileModel.insertMany(file)
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw error
        }
    }
    async findAll(eventId) {
        try {
            const files = await fileModel
                .find({ eventId })
                .select('-updatedAt -__v -createdAt')
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw error
        }
    }
    async update(fileId, data) {
        try {
            const files = await fileModel.findByIdAndUpdate(fileId, data)
            return files
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to update data in database',
            )
            throw error
        }
    }
    async eventCompleted(eventId, data) {
        try {
            const files = await eventModel.findByIdAndUpdate(eventId, data)
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
