const Router = require('express').Router;

// subrouters
const googleAuthRoutes = require('./auth');

const router = new Router();

// auth routes
router.use('/auth', googleAuthRoutes);

module.exports = router;