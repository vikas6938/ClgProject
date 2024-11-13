import mongoose from 'mongoose'
const Schema = mongoose.Schema

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    },
    { timestamps: true },
)

export default mongoose.model('customer', customerSchema)
