import mongoose from 'mongoose'
import { Config } from '../config/index.js'
const Schema = mongoose.Schema

const fileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
        },
        path: {
            type: String,
            required: true,
            get(path) {
                return `${Config.APP_URL}/${path.replace(/\\/g, '/')}`
            },
        },
        size: {
            type: Number,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer', // Reference to the customer model
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event', // Reference to the event model
        },
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'folder', // Reference to the event model
        },
    },
    { timestamps: true, toJSON: { getters: true } },
)

export default mongoose.model('file', fileSchema)
