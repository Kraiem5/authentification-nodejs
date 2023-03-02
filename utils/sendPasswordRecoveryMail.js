var nodemailer = require('nodemailer');


const smtpTransport = require('nodemailer-smtp-transport');




module.exports.sendEmail = async (email, token) => {
  try {


    const transporter = nodemailer.createTransport(smtpTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'benfoulen119@gmail.com',
        pass: 'wbfsgwxqqopahulj'
      }
    }));

    var mailOptions = {
      from: 'benfoulen119@gmail.com',
      to: email,
      subject: 'message de test ',
      html: "<b> salut</b>" +
        `<br> votre lien de recuperation <a href="http://localhost:4200/reset-password/${token}"> http://localhost:4200/reset-password/${token}</a>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error)
  }
}