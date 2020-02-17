const { body } = require('express-validator')
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const emailNotExists = async (req) => {
    let profile = null;
    const chain = await body('email')
        .exists().withMessage('please provide user email!')
        .bail()
        .isString('email must be string')
        .bail()
        .trim()
        .customSanitizer((email) => email.toLowerCase())
        .isEmail().withMessage('Please provide valid email!')
        .bail()
        .custom(async (email) => {
            profile = await LocalProfile.findOne({ email });
            if (profile) {
                throw new Error('email allready in use');
            }
        }).run(req);
    const hasErrors = !!chain._errors.length;
    return !hasErrors;
}

module.exports = emailNotExists;