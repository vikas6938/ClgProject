import { checkSchema } from 'express-validator'

export default checkSchema({
    name: {
        errorMessage: 'name is required',
        notEmpty: true,
        trim: true,
    },
    mobile: {
        errorMessage: 'mobile number is required',
        notEmpty: true,
        trim: true,
    },
})
