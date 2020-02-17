const { body } = require('express-validator');
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const emailExists = async (req, res, next) => {
    let profile = null;

    await body('email')
        .exists().withMessage('please provide email to send password change code')
        .bail()
        .isEmail().withMessage('please provide valid email')
        .bail()
        .custom(async (email) => {
            profile = await LocalProfile.findOne({ email });
            if (!profile) {
                throw new Error('Email not exists!')
            }
            req.user = profile;
        }).run(req);

    next();
}

module.exports = emailExists;