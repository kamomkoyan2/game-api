const jwt = require('jsonwebtoken');

const codeExpired = async (req, res, next) => {
    const user = req.user;
    if (user.passwordChangeCode) {
        let payload = null;
        try {
            payload = jwt.verify(user.passwordChangeCode, process.env.JWT_PASS_CHANGE_SECRET)
            const expDate = new Date(payload.exp * 1000);
            const waitMinutes = Math.ceil((expDate.getTime() - new Date().getTime()) / 1000 / 60)
            return res.send({
                message: 'Please try to refresh password change code after ' + waitMinutes + ' minute(`s)',
            })
        } catch (error) { }
    }
    next();
}

module.exports = codeExpired;