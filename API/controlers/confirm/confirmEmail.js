const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function confirmEmail(req, res) {
  const resFindOne = await modelFindOne(req.params, "uuid");
  console.log("here", req.params, resFindOne, !resFindOne.length);
  if (!resFindOne.length) {
    res.json({ msg: "we could not find you" });
  } else {
    // import model set user isAuth
    // send "we find you"
  }
  // ou renvoyer aue c'est deja authentifié
};
