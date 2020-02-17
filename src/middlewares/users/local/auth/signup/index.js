const { body } = require('express-validator')

const validateMain = require('./helpers/main');
const emailNotExists = require('./helpers/emailNotExists');

const signupValidation = async (req, res, next) => {
    await emailNotExists(req);
    await validateMain(req)
    next();
}

module.exports = signupValidation