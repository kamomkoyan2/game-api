const Router = require('express').Router;

// subrouters
const localAuthRoutes = require('./auth');
const localPasswordRoutes = require('./password');

const router = new Router();

// auth routes
router.use('/auth', localAuthRoutes);
router.use('/password', localPasswordRoutes);

module.exports = router;