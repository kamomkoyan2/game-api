const randomString = require('randomstring');

const genCode = () => {
    const codeNum = randomString.generate({
        length: 6,
        charset: 'numeric',
    })

    const code = {
        value: codeNum,
        expirationDate: new Date()
    }
    return code;
}

module.exports = genCode;