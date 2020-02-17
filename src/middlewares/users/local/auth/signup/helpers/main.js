const { body } = require('express-validator');

const validations = [
    body('name')
        .exists().withMessage('please provide user name!')
        .bail()
        .isString('name must be string')
        .bail()
        .trim()
        .notEmpty().withMessage('name cant be empty string')
        .bail()
        .isLength({ min: 3, max: 30 }).withMessage('name min length is 3 characters, maxlength is 30 characters'),
    body('password')
        .exists().withMessage('please write password')
        .bail()
        .isString().withMessage('please provide string for password')
        .bail()
        .notEmpty().withMessage('password cant be empty string')
        .bail()
        .custom(async (password) => {
            if (/\s/.test(password)) {
                throw new Error('password cant contain tabulations!')
            }
            if (password.length < 6) {
                throw new Error('password required min length is 6 characters')
            }
        }),
]

const mainValidation = async (req) => {
    for (let chain of validations) {
        await chain.run(req);
    }
}

module.exports = mainValidation;