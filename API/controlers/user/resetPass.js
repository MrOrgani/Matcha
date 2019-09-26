const modelFindOne = require("./../../models/modelUser/modelFindOne");

module.exports = async function resetPass(req, res) {
  try {
    const resFindOne = await modelFindOne(req.params.id, "uuid");
    if (!resFindOne.uuid) {
      res.status(203).send("We could not find you");
    } else {
      modelFindOne(
        req.params.id,
        "uuid",
        `SET u.password = "${req.body.password}"`
      );
      res.status(200).send("Your password has been changed");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};
