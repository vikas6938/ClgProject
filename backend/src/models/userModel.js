import mongoose from 'mongoose'
import Roles from '../constants/index.js'
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        studioname: {
            type: String,
        },
        role: {
            type: String,
            default: Roles.USER,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

export default mongoose.model('User', userSchema)
