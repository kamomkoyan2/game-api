const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const isValidPassword = async function (password) {
    const profile = this;
    return await bcrypt.compare(password, profile.password);
}

const genToken = async function () {
    const profile = this;
    const token = jwt.sign({ id: profile._id, method: 'local' }, process.env.JWT_LOGIN_SECRET);

    profile.tokens.push(token);
    await profile.save();
    return token;
}

const genActivationCode = async function () {
    const profile = this;

    const activationCode = jwt.sign({ id: profile._id }, process.env.JWT_VERIFY_SIGNUP_SECRET, {
        expiresIn: 60 * 5,
    });

    profile.activationCode = activationCode;
    await profile.save();
    return activationCode;
}

const genPasswordChangeCode = async function () {
    const profile = this;
    const passwordChangeCode = jwt.sign({ id: profile._id }, process.env.JWT_PASS_CHANGE_SECRET, {
        expiresIn: 60 * 2
    });

    profile.passwordChangeCode = passwordChangeCode;
    await profile.save();
    return passwordChangeCode;
}

module.exports = {
    isValidPassword,
    genToken,
    genActivationCode,
    genPasswordChangeCode,
}



/*



const genCode = async function (type) {
    const profile = this;
    switch (type) {
        case 'passwordChangeCode':
            profile.passwordChangeCode = genCode();
            break;
        case 'activationCode':
            profile.activationCode = genCode();
            break;
        default: throw new Error('unnown type of code');
    }
    await profile.save()
    return code;
}



const codeIsExpired = async function () {
    const profile = this;
    const profileCode = profile.activationCode;
    if (!profileCode) {
        return true;
    }

    const now = new Date();
    if (now > profileCode.expDate) {
        return true;
    }
    return false;
}

const compareCode = async function (codeValue) {
    const profile = this;
    const profileCode = profile.activationCode.value;
    return profileCode === codeValue;
}

const expireExistingCode = async function () {
    const profile = this;
    profile.activationCode = null;
    await profile.save()
}

const activate = async function () {
    const profile = this;
    profile.activationCode = null;
    profile.pending = null;
    await profile.save();
}

const isValidPassword = async function (password) {
    const profile = this;
    return bcrypt.compare(password, profile.password);
}

*/