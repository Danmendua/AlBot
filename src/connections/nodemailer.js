const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const send = (to, subject, body) => {
    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: body
    })
};

module.exports = send;