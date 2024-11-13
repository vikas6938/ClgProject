import { checkSchema } from 'express-validator'

export default checkSchema({
    email: {
        errorMessage: 'email is required',
        notEmpty: true,
        trim: true,
    },
    password: {
        errorMessage: 'password is required',
        notEmpty: true,
        trim: true,
    },
})
