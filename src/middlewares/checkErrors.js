const { validationResult } = require('express-validator');

const checkErrors = (message, status = 400) => async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (message !== undefined && message !== null) {
            return res.status(status).send({
                message: message,
            })
        }
        return res.status(status).send({
            message: 'Errors occured',
            errors: errors.array()
        })
    }
    next();
}

module.exports = checkErrors;