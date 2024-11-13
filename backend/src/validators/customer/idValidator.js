import { checkSchema } from 'express-validator'

export default checkSchema({
    id: {
        errorMessage: 'provide id of a customer',
        notEmpty: true,
        trim: true,
    },
})
