const jwt = require('jsonwebtoken');

const codeExpired = async (req, res, next) => {
    const profile = req.user;

    if (profile.activationCode) {
        try {
            const payload = jwt.verify(profile.activationCode, process.env.JWT_VERIFY_SIGNUP_SECRET)
            const expDate = new Date(payload.exp * 1000);
            const waitMinutes = Math.ceil((expDate.getTime() - new Date().getTime()) / 1000 / 60)
            return res.send({
                message: 'Please try to refresh activation code after ' + waitMinutes + ' minutes!',
            })
        } catch (error) { }
    }
    next();
}

module.exports = codeExpired;