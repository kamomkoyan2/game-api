const Router = require('express').Router;
const router = new Router();

const passport = require('passport');

router.post('/login',
    passport.authenticate('googletoken', { session: false }),
    async (req, res, next) => {
        const user = req.user;

        const token = await user.genToken();
        res.send({ message: 'google login:)', token });
    });

router.post('/logout',
    passport.authenticate('googlejwt', { session: false }),
    async (req, res, next) => {
        const user = req.user;
        const token = req.header('Authorization');

        user.tokens = user.tokens.filter((profileToken) => profileToken !== token);
        await user.save()
        res.send({
            message: 'you loged out from google account.'
        })
    });

module.exports = router;