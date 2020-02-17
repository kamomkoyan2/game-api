const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const isVerified = async (req, res, next) => {
    const profile = req.user;
    if ((profile instanceof LocalProfile) && profile.pending) {
        return res.send({
            message: 'You must verify your account to contnue'
        })
    }
    next();
}

module.exports = isVerified;