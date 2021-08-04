var nodemailer = require('nodemailer');

const sendMailWhenCreateUser = async (email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shc7943@gmail.com',
            pass: '206743619'
        }
    });

    var mailOptions = {
        from: 'noreply',
        to: "shc7943@gmail.com",
        // to: email,
        subject: 'Welcome!',
        text: 'please click the link above to complete your registeration',
        replyTo: 'no-reply',
        html: '<p>please click the link above to complete your registeration<br/> <a href="http://localhost:3000">here</a> </p>'

    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { sendMailWhenCreateUser }