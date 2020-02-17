const LocalProfile = require(__base + 'src/db/models/Profile/Local');

const { Strategy: LocalStrategy } = require('passport-local');

const localtoken = new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await LocalProfile.findOne({ email });
        if (!user) {
            return done(null, false);
        }

        const isValidPassword = await user.validPassword(password);
        if (!isValidPassword) {
            return done(null, false)
        }
        done(null, user);
    } catch (err) {
        done(err, false, err.message);
    }
})

module.exports = localtoken;