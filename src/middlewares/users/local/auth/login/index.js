const { body } = require('express-validator')
const emailExists = require('./helpers/emailExists');

const loginValidation = async (req, res, next) => {
    const validEmail = await emailExists(req);

    if (validEmail) {
        await body('password')
            .exists().withMessage('please provid a password')
            .bail()
            .isString().withMessage('password must be a string')
            .bail()
            .notEmpty().withMessage('password cant be empty string')
            .bail()
            .custom(async (password) => {
                const profile = req.user;
                const isValidPassword = await profile.isValidPassword(password);
                if (!isValidPassword) {
                    throw new Error('Invalid Password provided for email: ' + profile.email);
                }
            }).run(req);
    }
    next();
}

module.exports = loginValidation