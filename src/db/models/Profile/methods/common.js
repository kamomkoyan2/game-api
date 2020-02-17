const isValidToken = function (token) {
    const profile = this;
    return profile.tokens.some((profileToken) => profileToken === token);
}

module.exports = {
    isValidToken,
}