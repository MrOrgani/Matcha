const bcrypt = require("bcryptjs");
const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("./cleanUserData");

module.exports = async function loginUser(req, res) {
  try {
    let userData = await modelFindOne(req.body.login, "login");
    if (!userData.login) return res.status(201).send("Invalid username");
    if (!(await bcrypt.compare(req.body.password, userData.password)))
      return res.status(206).send("Invalid password");
    if (!userData.isConfirmed)
      return res.status(206).send("You need to validate your account.");
    userData = cleanUserData(userData);
    return res.status(200).send(userData);
  } catch (err) {
    return res.status(400).send(err, "in login user", req);
  }
};
