const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function confirmEmail(req, res) {
  const resFindOne = await modelFindOne(req.params.id, "uuid");

  if (!resFindOne.lastName) {
    res.status(203).json({ msg: "we could not find you" });
  } else {
    const { isConfirmed } = resFindOne;
    if (!isConfirmed) {
      modelFindOne(req.params.id, "uuid", "SET u.isConfirmed = true");
      res.json({ msg: "Your account has been validated" });
    } else
      res.status(201).json({ msg: "Your account has already been validated" });
  }
};
