const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const validToken = async (req) => {
    const chain = await body('password_change_token')
        .isJWT().withMessage('password_change_token must be valid jwt')
        .bail()
        .custom(async (token) => {
            let payload = null;
            try {
                payload = jwt.verify(token, process.env.JWT_PASS_CHANGE_SECRET);
            } catch (error) {
                console.log(1);
                console.log(error)
                throw new Error('invalid token provided')
            }

            const profile = await LocalProfile.findOne({ _id: payload.id });
            if (!profile) {
                console.log(2);
                throw new Error('invalid token provided');
            }

            if (profile.passwordChangeCode !== token) {
                console.log(3);
                throw new Error('invalid token provided')
            }
            req.user = profile;
        }).run(req);

    const hasErrors = !!chain._errors.length;
    return !hasErrors;
}

module.exports = validToken;