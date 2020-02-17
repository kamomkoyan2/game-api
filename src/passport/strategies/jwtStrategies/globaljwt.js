const mongoose = require('mongoose');

const { Strategy: JWTStrategy } = require('passport-jwt');

const globaljwt = new JWTStrategy({
    secretOrKey: process.env.JWT_LOGIN_SECRET,
    jwtFromRequest: (req) => req.header('Authorization'),
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const methodMapModel = {
            'google': 'GoogleProfile',
            'local': 'LocalProfile'
        }
        const { id, method } = payload;
        const token = req.header('Authorization');

        const modelName = methodMapModel[method];
        const ProfileModel = mongoose.model(modelName);

        let profile = null;
        profile = await ProfileModel.findByPayload(payload);
        if (!profile) {
            return done(null, false, 'invalid token provided')
        }

        const isValidToken = profile.isValidToken(token);
        if (!isValidToken) {
            return done(null, false, 'invalidtoken provided');
        }

        done(null, profile);
    } catch (err) {
        done(err, false, err.message);
    }
});

module.exports = globaljwt;