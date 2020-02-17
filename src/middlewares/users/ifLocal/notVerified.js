const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const notVerified = async (req, res, next) => {
    const profile = req.user;
    if ((profile instanceof LocalProfile) && !profile.pending) {
        return res.send({
            message: 'You are allready verified user and you cant continue on this route'
        })
    }
    next();
}

module.exports = notVerified;