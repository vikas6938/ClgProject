import folderModel from '../models/folderModel.js'

export class FolderService {
    async create({ name, customerId, userId, eventId }) {
        const event = folderModel({ name, customerId, userId, eventId })
        const data = await event.save()
        return data
    }
    async findAll(id, userId) {
        const events = await folderModel
            .find({ eventId: id, userId })
            .select('-updatedAt -__v -createdAt')
        return events
    }
    async removeFolder(id, userId) {
        return await folderModel.deleteOne({ _id: id, userId })
    }
}
