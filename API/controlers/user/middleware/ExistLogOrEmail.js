const modelFindOne = require("./../../../models/modelUser/modelFindOne");

module.exports = async function ExistLogOrEmail(req, res, next) {
  try {
    // console.log("ExistKig Or Email");
    let data = await modelFindOne(req.body.login, "login");
    if (data.length > 0) res.status(201).send("Login already taken.");
    else {
      data = await modelFindOne(req.body.email, "email");
      if (data.length > 0) res.status(201).send("Email already taken.");
      else next();
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
