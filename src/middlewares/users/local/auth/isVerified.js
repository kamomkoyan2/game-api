const isVerified = async (req, res, next) => {
    const profile = req.user;
    if(profile.pending) {
        return res.send({
            message: 'You must verify your account to contnue'
        })
    }
    next();
}

module.exports = isVerified;