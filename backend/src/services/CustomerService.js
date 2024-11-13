import createHttpError from 'http-errors'
import customerModel from '../models/customerModel.js'
import eventModel from '../models/eventModel.js'
import fileModel from '../models/fileModel.js'

export class CustomerService {
    async create({ name, mobile, userId }) {
        try {
            const customer = new customerModel({
                name,
                mobile,
                userId,
            })
            const data = await customer.save()
            return data
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            )
            throw error
        }
    }
    async find(id) {
        return await customerModel
            .find({ userId: id })
            .select('-updatedAt -__v -createdAt')
    }
    async removeCustomer(id) {
        const query = { _id: id }
        await customerModel.deleteOne(query)
        await eventModel.deleteMany({ customerId: id })
        await fileModel.deleteMany({ customerId: id })
        return
    }
    async updateCustomer({ name, mobile, id }) {
        return await customerModel
            .findByIdAndUpdate(id, { name, mobile }, { new: true })
            .select('-updatedAt -__v -createdAt')
    }
}
