const modelUser = require("../models/modelUser");
const Validation = require("./Validation");
const bcrypt = require("bcryptjs");

async function CreateUser(req, res) {
  // Check if we can create user
  const PropNode = "login";
  const PropNodeExists = await modelUser.findOne(req.body.login, PropNode);
  if (PropNodeExists.length)
    return res.status(206).send(`${PropNode} is taken`);
  let errors = await Validation.RegisterValidation(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

  const user = await cryptAndObjectify(req);
  try {
    const data = await modelUser.createUser(user, res);
    res.status(200).send(data);
  } catch (err) {
    res.status(206).send(err);
  }
}

async function LoginUser(req, res) {
  const user = await cryptAndObjectify(req);
  let errors = await Validation.LoginValidation(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

  try {
    const userData = await modelUser.connect(user);
    if (isEmpty(userData)) return res.status(206).send("Invalid credentials");
    res.status(200).send(userData);
  } catch (err) {
    res.status(206).send(err);
  }
}

// Crypts pwd and returns a well rounded user object from req.body
async function cryptAndObjectify(req) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    login: req.body.login,
    password: hashPassword
  };
  if (req.body.email) user.email = req.body.email;
  return user;
}

// empty obj checker
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

module.exports = {
  CreateUser,
  LoginUser
};
