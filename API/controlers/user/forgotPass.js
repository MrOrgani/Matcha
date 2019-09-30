const sendEmail = require("./sendEmail");
const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function forgotPass(req, res) {
  try {
    let userData = await modelFindOne(
      req.body.email,
      "email",
      "AND NOT EXISTS(u.IdDuoQuadra)"
    );
    if (!userData.firstName)
      return res.status(201).send("We could not find you");
    //envoie mail avec lien pour nouveau password
    sendEmail(req.body.email, true, userData.uuid);
    return res
      .status(200)
      .json({ msg: "An email to change your password has been sent" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
