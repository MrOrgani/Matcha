const modelFindOne = require("./../../../models/modelUser/modelFindOne");

module.exports = async function ExistLogOrEmail(req, res, next) {
  try {
    let data = await modelFindOne(req.body.login, "login");
    console.log("ExistKig Or Email");
    if (data.length > 0) res.status(400).send("Login already taken.");
    else {
      data = await modelFindOne(req.body.email, "email");
      if (data.length > 0) res.status(400).send("Login already taken.");
      else next();
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
