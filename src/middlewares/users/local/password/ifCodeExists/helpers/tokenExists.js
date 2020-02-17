const { body } = require('express-validator');

const tokenExists = async (req) => {
    const chain = await body('password_change_token')
        .exists().run(req);

    const hasErrors = !!chain._errors.length;
    chain._errors = [];
    return !hasErrors;
}

module.exports = tokenExists;