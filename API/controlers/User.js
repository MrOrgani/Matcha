const ModelUser = require("../models/User");
const Validation = require("./Validation");

async function createUser(req, res) {
  const reqData = {
    login: req.body.login,
    password: req.body.password,
    email: req.body.email
  };

  let errors = {};
  // Check if we can create user
  errors = await Validation.User(reqData);
  if (!errors.length) {
    ModelUser.createUser(reqData, res);
  } else {
    res.status(201).send(errors);
  }
}

module.exports = {
  createUser
};
