const sendEmail = require("./sendEmail");
const bcrypt = require("bcryptjs");
const modelFindOne = require("./../../models/modelUser/modelFindOne");
const cleanUserData = require("./cleanUserData");

module.exports = async function forgotPass(req, res) {
  try {
    let userData = await modelFindOne(req.body.email, "email");
    console.log("forgotPass userData", userData);
    if (userData.length === 0)
      return res.status(401).json({ msg: "we could not find you" });
    userData = userData[0]._fields[0].properties;
    //envoie mail avec lien pour nouveau password
    // sendEmail(req.body.email, true, userData.uuid);

    // userData.indexOfPP = userData.indexOfPP.low;
    // if (!(await bcrypt.compare(req.body.password, userData.password)))
    //   return res.status(206).send("Invalid password");
    // userData = cleanUserData(userData);
    return res
      .status(200)
      .json({ msg: "An email to change your password has been sent" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
