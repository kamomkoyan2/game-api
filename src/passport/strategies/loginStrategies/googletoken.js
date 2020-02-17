
const GoogleProfile = require(__base + 'src/db/models/Profile/Google');;

const GoogleStrategy = require('passport-google-plus-token');

const googletoken = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let existingProfile = null;
        existingProfile = await GoogleProfile.findOne({ id: profile.id });
        
        console.log('profile', profile)
        console.log('existingProfile', existingProfile)
        if (!existingProfile) {
            const newProfile = new GoogleProfile({
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.name.givenName + ' ' + profile.name.familyName
            })
            await newProfile.save();
            return done(null, newProfile);
        }

        await existingProfile.updateInfo(profile);
        return done(null, existingProfile);
    } catch (error) {
        done(error, false, error.message);
    }
});

module.exports = googletoken;