const GoogleProfile = require(__base + 'src/db/models/Profile/Google');

const { Strategy: JWTStrategy } = require('passport-jwt');

const googlejwt = new JWTStrategy({
    secretOrKey: process.env.JWT_LOGIN_SECRET,
    jwtFromRequest: (req) => req.header('Authorization'),
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const token = req.header('Authorization');
        let profile = null;

        if (payload.method !== 'google') {
            return done(null, false, 'invalid token provided')
        }

        profile = await GoogleProfile.findOne({ id: payload.id });

        if (!profile) {
            return done(null, false, 'invalid token provided');
        }

        const isValidToken = profile.isValidToken(token);
        if (!isValidToken) {
            return done(null, false, 'invalid token provided');
        }

        done(null, profile);
    } catch (err) {
        done(err, false, err.message);
    }
});

module.exports = googlejwt;