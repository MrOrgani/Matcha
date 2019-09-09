const sendEmail = require("./sendEmail");
const bcrypt = require("bcryptjs");
const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("./cleanUserData");

module.exports = async function forgotPass(req, res) {
  try {
    let userData = await modelFindOne(req.body.email, "email");
    if (userData.length === 0)
      return res.status(201).send("We could not find you");
    userData = userData[0]._fields[0].properties;
    //envoie mail avec lien pour nouveau password
    sendEmail(req.body.email, true, userData.uuid);
    return res
      .status(200)
      .json({ msg: "An email to change your password has been sent" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
