const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function confirmEmail(req, res) {
  const resFindOne = await modelFindOne(req.params.id, "uuid");
  if (!resFindOne.length) {
    res.status(203).json({ msg: "we could not find you" });
  } else {
    const { isAuth } = resFindOne[0]._fields[0].properties;
    // console.log("isAuth", isAuth);
    if (!isAuth) {
      modelFindOne(req.params.id, "uuid", "SET u.isAuth = true");
      res.json({ msg: "Your account has been validated" });
    } else
      res.status(201).json({ msg: "Your account has already been validated" });
  }
};
