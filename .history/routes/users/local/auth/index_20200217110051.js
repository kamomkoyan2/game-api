const Router = require('express').Router;
const router = new Router();

const passport = require('passport');

// send mail
const sendMail = require(__base + 'src/email/send');

// models
const LocalProfile = require(__base + 'src/db/models/Profile/Local');

// middlewares
const usersValidate = require(__base + 'src/middlewares/users/index');
const checkErrors = require(__base + 'src/middlewares/checkErrors')

router.post('/signup',
    usersValidate.local.auth.signup,
    checkErrors(),
    async (req, res, next) => {
        try {
            const profile = new LocalProfile({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                pending: true
            })
            await profile.save();

            const token = await profile.genToken();
            const activationCode = await profile.genActivationCode();

            const address = 'http://localhost:8000/react-verify-page/' + activationCode;
            sendMail(
                `Please verify your account: <a style="text-align: center;
                with: 100px;
                font-size: 17px;
                display: inline-block;
                color: #c5773d;
                font-weight: 700;
                text-decoration: none;"
                href="${address}">Verify Account</a>`,
                'Verify Account',
                process.env.MAIL_FROM,
                profile.email
            );

            console.log('activationCode ', activationCode);
            res.send({
                message: 'local profile created, link to verify your account sended to your email',
                token
            })
        } catch (err) {
            next(err)
        }
    })

router.post('/code/verify',
    usersValidate.local.auth.code.isValid,
    checkErrors(),
    usersValidate.local.auth.notVerified,
    async (req, res, next) => {
        try {
            const profile = req.user;

            profile.pending = false;
            profile.activationCode = null;
            await profile.save();
            res.send({
                message: 'Your account now verifyed'
            })
        } catch (err) {
            next(err);
        }
    })

router.post('/code/refresh',
    passport.authenticate('localjwt', { session: false }),
    usersValidate.local.auth.notVerified,
    usersValidate.local.auth.code.expired,
    async (req, res, next) => {
        try {
            const profile = req.user;
            const activationCode = await profile.genActivationCode();

            const address = 'http://localhost:8000/react-verify-page/' + activationCode;
            sendMail(
                `Please verify your account: <a style="text-align: center;
                    with: 100px;
                    font-size: 17px;
                    display: inline-block;
                    color: #c5773d;
                    font-weight: 700;
                    text-decoration: none;"
                    href="${address}">Verify Account</a>`,
                'Verify Account',
                process.env.MAIL_FROM,
                profile.email
            );

            return res.send({
                message: 'New code sended to your email'
            })
        } catch (err) {
            next(err);
        }
    })

router.post('/login',
    usersValidate.local.auth.login,
    // checkErrors(/* 'invalid credentials' */),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = await user.genToken();
            res.send({
                message: 'login to local account',
                token
            })
        } catch (err) {
            next(err)
        }
    })

router.post('/logout',
    passport.authenticate('localjwt', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = req.header('Authorization');

            user.tokens = user.tokens.filter((profileToken) => profileToken !== token);
            await user.save()
            console.log('loged out: ', token)
            res.send({
                message: 'you loged out from local account.'
            })
        } catch (err) {
            next(err)
        }
    });

module.exports = router;