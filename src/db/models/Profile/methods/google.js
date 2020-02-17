const jwt = require('jsonwebtoken')

const updateInfo = async function (profileInfo) {
    const profile = this;
    profile.email = profileInfo.emails[0].value;
    profile.name = profileInfo.name.givenName + ' ' + profileInfo.name.familyName;
    await profile.save();
    return profile;
}

const genToken = async function () {
    const profile = this;
    const token = jwt.sign({ id: profile.id, method: 'google' }, process.env.JWT_LOGIN_SECRET);

    profile.tokens.push(token);
    await profile.save();
    return token;
}

module.exports = {
    updateInfo,
    genToken,
}