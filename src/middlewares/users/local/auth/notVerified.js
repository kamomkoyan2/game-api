const isVerified = async (req, res, next) => {
    const profile = req.user;
    if(!profile.pending) {
        return res.send({
            message: 'This route can be handled only with not verifyed users!'
        })
    }
    next();
}

module.exports = isVerified;