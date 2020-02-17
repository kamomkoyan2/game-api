const Router = require('express').Router;

// subrouters
const localRoutes = require('./local');
const googleRoutes = require('./google');

const router = new Router();

// auth routes
router.use('/google', googleRoutes);
router.use('/local', localRoutes);

module.exports = router;