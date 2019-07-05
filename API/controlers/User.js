const modelUser = require("../models/modelUser");
const Validation = require("./Validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

async function createUser(req, res) {
  // Check if we can create user
  const PropNode = "login";
  const PropNodeExists = await modelUser.findOne(req.body.login, PropNode);
  if (PropNodeExists) return res.status(206).send(`${PropNode} is taken`);
  let errors = await Validation.RegisterValidation(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

  //create db ready userinfo with uuid for jwt
  const user = await cryptAndObjectify(req);
  user.uuid = await uuid();

  try {
    const data = await modelUser.createUser(user, res);
    res.status(200).send(data);
  } catch (err) {
    res.status(206).send(err);
  }
}

async function loginUser(req, res) {
  const user = await cryptAndObjectify(req);
  let errors = await Validation.LoginValidation(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

  const { login, password, uuid, email } = await modelUser.connect(
    user.login,
    "login"
  );
  const userData = { login, password, uuid, email };
  if (isEmpty(userData)) return res.status(206).send("Invalid username");
  const isValidPwd = await bcrypt.compare(req.body.password, userData.password);
  if (!isValidPwd) return res.status(206).send("Invalid password");
  delete userData.password;

  // JWT auth token
  // console.log("return from connection", userData);
  const token = jwt.sign({ uuid: userData.uuid }, process.env.TOKEN_SECRET);
  userData.uuid = token;
  res
    .header("auth-token", token)
    .status(200)
    .send(userData);
}

// Crypts pwd and returns a well rounded user object from req.body
async function cryptAndObjectify(req) {
  const salt = await bcrypt.genSalt(10);
  // console.log("salt: ", salt);
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

function gUsers(req, res) {
  ModelUser.gUsers(req, res);
}

function delUsers(req, res) {
  ModelUser.delUsers(req, res);
}

function getUsers(req, res) {
  ModelUser.getUsers(req, res);
}

module.exports = {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers
};
