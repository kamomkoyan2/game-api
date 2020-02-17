const Router = require('express').Router;
const router = new Router();

const passport = require('passport');

// middlewares
const usersValidate = require(__base + 'src/middlewares/users');
const checkErrors = require(__base + 'src/middlewares/checkErrors')

const sendMail = require(__base + 'src/email/send');

router.post('/change',
    usersValidate.local.password.ifCodeExists.changeRoute,
    passport.authenticate('localjwt', { session: false }),
    usersValidate.local.password.body,
    checkErrors(),
    async (req, res, next) => {
        try {
            const user = req.user;

            const validLastPassword = await user.isValidPassword(req.body.lastPassword);
            if (!validLastPassword) {
                return res.send({
                    message: 'invalid last password provided'
                })
            }

            user.password = req.body.newPassword;
            user.passwordChangeCode = null;
            await user.save();
            res.send({
                message: 'password successfullty changed'
            })
        } catch (err) {
            next(err);
        }
    })

router.post('/change',
    usersValidate.local.password.ifCodeExists.body,
    checkErrors(),
    async (req, res, next) => {
        try {
            const user = req.user;
            console.log('route')

            user.password = req.body.newPassword;
            user.passwordChangeCode = null;
            await user.save();
            res.send({
                message: 'password successfullty changed'
            })
        } catch (err) {
            next(err);
        }
    })

router.post('/forget',
    usersValidate.local.emailExists,
    checkErrors(),
    usersValidate.local.password.codeExpired,
    async (req, res, next) => {
        try {
            const user = req.user;

            const passwordChangeCode = await user.genPasswordChangeCode();

            const address = 'http://localhost:8000/react-password-change-page/' + passwordChangeCode;
            sendMail(
                `Go to link if you want change your password:
                <a style="text-align: center;
                with: 100px;
                font-size: 17px;
                display: inline-block;
                color: #c5773d;
                font-weight: 700;
                text-decoration: none;"
                href="${address}">Change Password</a>`,
                'Change Password',
                process.env.MAIL_FROM,
                user.email,
            );

            // console.log('passwordChangeCode ', passwordChangeCode);
            res.send({
                message: 'Your password change code sended to your email',
            })
        } catch (err) {
            next(err);
        }
    })

module.exports = router;