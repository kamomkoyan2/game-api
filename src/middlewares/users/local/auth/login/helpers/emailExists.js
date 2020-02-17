const { body } = require('express-validator')
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const emailExists = async (req) => {
    let profile = null;
    const chain = await body('email')
        .exists().withMessage('please provide user email!')
        .bail()
        .isString('email must be string')
        .bail()
        .customSanitizer((email) => email.toLowerCase())
        .isEmail().withMessage('Please provide valid email!')
        .bail()
        .custom(async (email) => {
            profile = await LocalProfile.findOne({ email });
            if (!profile) {
                throw new Error('email not exists');
            }
            req.user = profile;
        }).run(req);
    const hasErrors = !!chain._errors.length;
    return !hasErrors;
}

module.exports = emailExists;