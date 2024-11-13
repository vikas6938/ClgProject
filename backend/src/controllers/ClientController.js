import { validationResult } from 'express-validator'
import eventModel from '../models/eventModel.js'
import fileModel from '../models/fileModel.js'

export default class ClientController {
    async register(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        const { name, mobile } = req.body
        try {
            const customer = await this.customerService.create({
                name,
                mobile,
                userId: req.auth.sub,
            })
            res.status(201).json({
                id: customer.id,
                name: customer.name,
                mobile: customer.mobile,
            })
        } catch (error) {
            return next(error)
        }
    }
    async find(req, res, next) {
        const { accessCode } = req.body
        try {
            const event = await eventModel.findOne({ accessCode })
            const files = await fileModel.find({ eventId: event._id })
            res.json({
                data: files,
            })
        } catch (error) {
            return next(error)
        }
    }
    async remove(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        try {
            const customerId = req.body.id
            const customers =
                await this.customerService.removeCustomer(customerId)
            res.json({ customers })
        } catch (error) {
            return next(error)
        }
    }
    async update(req, res, next) {
        // validation
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        try {
            let { name, mobile, id } = req.body
            if (name === '') {
                name = undefined
            }
            if (mobile === '') {
                mobile = undefined
            }
            const customers = await this.customerService.updateCustomer({
                name,
                mobile,
                id,
            })
            res.json({ customers })
        } catch (error) {
            return next(error)
        }
    }
}
