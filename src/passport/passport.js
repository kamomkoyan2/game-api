// registering strategies
const passport = require('passport');
const strategies = require('./strategies/index');

Object.keys(strategies.jwtStrategies).forEach((strategyName) => {
    passport.use(strategyName, strategies.jwtStrategies[strategyName]);
})


Object.keys(strategies.loginStrategies).forEach((strategyName) => {
    passport.use(strategyName, strategies.loginStrategies[strategyName]);
})