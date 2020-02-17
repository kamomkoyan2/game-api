const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = async (
    message = 'message',
    subject = 'subject',
    from = 'GameAppFromTest@gmail.com',
    to = 'test@gmail.com',
    type = 'html'
) => {
    const msg = {
        to: to,
        from: from,
        subject: subject
    }
    switch (type) {
        case 'text':
            msg.text = message;
            break;
        case 'html':
            msg.html = message;
            break;
        default: throw new Error('invalid type of message');
    }

    const response = await sgMail.send(msg);
    return response;
}

module.exports = send;