const nodemailer = require("nodemailer");

module.exports = async function sendMail(email, np = false, key) {
  // let testAccount = await nodemailer.createTestAccount();

  console.log("in Sendemail");
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    sendmail: true,
    // path: "/usr/sbin/sendmail",
    auth: {
      user: "hester.murray@ethereal.email",
      pass: "S6PVnQW3zn8bXDUkEu"
    }
  });
  // console.log("key email user", key);
  await transporter.sendMail({
    from: "ValentinLePigeon@matcha.com",
    to: email,
    subject: !np ? "Welcome" : "Password forgotten",
    text: !np ? "Confirm your account" : "Change your password",
    html: !np
      ? `Confirm your account : <a href=\"http://localhost:3000/api/user/confirm/${key}\">here</a>`
      : `Change your password : <a href=\"http://localhost:3000/api/user/reset/${key}\">here</a>`
  });
};
