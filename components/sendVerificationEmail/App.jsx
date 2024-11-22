const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha',
  },
});

exports.sendVerificationCode = functions.https.onCall((data, context) => {
  const { email, code } = data;

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Seu Código de Verificação',
    text: `Seu código de verificação é: ${code}`,
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false, error: error.message };
    });
});
