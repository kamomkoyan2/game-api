const { body } = require('express-validator');

const validations = [
    body('lastPassword')
        .exists().withMessage('please write lastPassword')
        .bail()
        .isString().withMessage('please provide string for lastPassword')
        .bail()
        .notEmpty().withMessage('lastPassword cant be empty string')
        .bail()
        .custom(async (password) => {
            if (/\s/.test(password)) {
                throw new Error('lastPassword cant contain tabulations!')
            }
            if (password.length < 6) {
                throw new Error('lastPassword required min length is 6 characters')
            }
        }),
    body('newPassword')
        .exists().withMessage('please write newPassword')
        .bail()
        .isString().withMessage('please provide string for newPassword')
        .bail()
        .notEmpty().withMessage('newPassword cant be empty string')
        .bail()
        .custom(async (password) => {
            if (/\s/.test(password)) {
                throw new Error('newPassword cant contain tabulations!')
            }
            if (password.length < 6) {
                throw new Error('newPassword required min length is 6 characters')
            }
        }),
]

const validBody = async (req, res, next) => {
    for (let chain of validations) {
        await chain.run(req);
    }
    next();
}

module.exports = validBody;