import mongoose from 'mongoose'
const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer', // Reference to the customer model
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        accessCode: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true },
)

export default mongoose.model('event', eventSchema)
