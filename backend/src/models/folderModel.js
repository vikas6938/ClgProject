import mongoose from 'mongoose'
const Schema = mongoose.Schema

const folderSchema = new Schema(
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
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event', // Reference to the event model
        },
    },
    { timestamps: true },
)

export default mongoose.model('folder', folderSchema)
