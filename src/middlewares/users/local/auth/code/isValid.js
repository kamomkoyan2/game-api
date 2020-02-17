const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const isValid = async (req, res, next) => {
    let profile = null;

    await body('verify_token')
        .exists().withMessage('please provide user verify_token!')
        .bail()
        .isJWT().withMessage('verify_token must be jsonwebtoken')
        .bail()
        .custom(async (verifyToken) => {
            let payload = null;
            try {
                payload = jwt.verify(verifyToken, process.env.JWT_VERIFY_SIGNUP_SECRET)
            } catch (error) {
                throw new Error('invalid token provided')
            }

            profile = await LocalProfile.findOne({ _id: payload.id });
            if (!profile) {
                throw new Error('Invalid Token profided');
            }
            req.user = profile;
        }).run(req);
    // console.log('verification token validation end')
    next();
}

module.exports = isValid;