const Router = require('express').Router;

const passport = require('passport');

// middlewares
const usersValidate = require(__base + 'src/middlewares/users/index');
const checkErrors = require(__base + 'src/middlewares/checkErrors')

const router = new Router();

router.get('/secret-local-verified-or-not',
    passport.authenticate('localjwt', { session: false }),
    async (req, res) => {
        const user = req.user;
        res.send({
            message: 'Heeeyy Hello This is local secret',
            user
        })
    })


router.get('/secret-local-verified',
    passport.authenticate('localjwt', { session: false }),
    usersValidate.local.auth.isVerified,
    async (req, res) => {
        const user = req.user;
        res.send({
            message: 'Heeeyy Hello This is local verified users secret',
            user
        })
    })

router.get('/secret-local-not-verified',
    passport.authenticate('localjwt', { session: false }),
    usersValidate.local.auth.notVerified,
    async (req, res) => {
        const user = req.user;
        res.send({
            message: 'Heeeyy Hello This is local not verified users secret',
            user
        })
    })

module.exports = router;