import { checkSchema } from 'express-validator'

export default checkSchema({
    name: {
        errorMessage: 'name is required',
        notEmpty: true,
        trim: true,
    },
    email: {
        errorMessage: 'email is required',
        notEmpty: true,
        trim: true,
    },
    password: {
        errorMessage: 'password is required',
        notEmpty: true,
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'password should be atleast 8 chars',
        },
    },
})
