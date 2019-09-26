const modelFindOne = require("./../../../models/modelUser/modelFindOne");

module.exports = async function ExistLogOrEmail(req, res, next) {
  try {
    let data = await modelFindOne(req.body.login, "login");
    if (data.firstName) res.status(201).send("Login already taken.");
    else {
      data = await modelFindOne(req.body.email, "email");
      if (data.firstName) res.status(201).send("Email already taken.");
      else next();
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
