const bcrypt = require("bcryptjs");
const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("./cleanUserData");

module.exports = async function loginUser(req, res) {
  try {
    let userData = await modelFindOne(req.body.login, "login");
    if (userData.length === 0) return res.status(401).send("Invalid username");
    userData = userData[0]._fields[0].properties;
    userData.indexOfPP = userData.indexOfPP.low;
    if (!(await bcrypt.compare(req.body.password, userData.password)))
      return res.status(206).send("Invalid password");
    userData = cleanUserData(userData);
    console.log("loginUser userDate", userData);
    return res.status(200).send(userData);
  } catch (err) {
    return res.status(400).send(err);
  }
};
