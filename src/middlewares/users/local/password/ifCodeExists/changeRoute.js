const { body } = require('express-validator');

const tokenExists = require('./helpers/tokenExists');

const changeRoute = async (req, res, next) => {
    const tokEx = await tokenExists(req);
    if(tokEx) {
        return next('route');
    }
    next();
}

module.exports = changeRoute;