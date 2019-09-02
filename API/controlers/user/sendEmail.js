const nodemailer = require("nodemailer");

module.exports = async function sendMail(email, nb, key) {
  // let testAccount = await nodemailer.createTestAccount();
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
  console.log("key email user", key);
  await transporter.sendMail({
    from: "ValentinLePigeon@matcha.com",
    to: email,
    subject: "Welcome ",
    text: "Confirm your account ",
    //  html: <h1>Click <a href=\"http://localhost:3000/security/reset/${key}\">here</a> to reset your password 🔒</h1>
    //    : <h1>Confirm your account 🔥 <a href=\"http://localhost:3000/authentication/${key}\">here</a></h1>
    html: `<h1>Confirm your account : <a href=\"http://localhost:3000/confirm/${key}\">here</a></h1>`
  });
};
