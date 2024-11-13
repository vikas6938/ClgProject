import mongoose from 'mongoose'
const Schema = mongoose.Schema

const refreshSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
        expiresAt: {
            type: Date,
        },
    },
    { timestamps: true },
)

export default mongoose.model('RefreshToken', refreshSchema)
