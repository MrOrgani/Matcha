const modelUser = require("../models/modelUser");
const Validation = require("./Validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

async function createUser(req, res) {
  try {
    if (await modelUser.findOne(req.body.login, "login"))
      return res.status(206).send(`login is taken`);
  } catch (err) {
    res.status(206).send(err);
  }
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

  try {
    if (!(await modelUser.findOne(req.body.login, "login")))
      return res.status(206).send("Invalid username");
  } catch (err) {
    res.status(206).send(err);
  }

  const userData = await modelUser.findOne(user.login, "login");
  if (isEmpty(userData)) return res.status(206).send("Invalid username");
  if (!(await bcrypt.compare(req.body.password, userData.password)))
    return res.status(206).send("Invalid password");
  delete userData.password;

  // JWT auth token
  const token = jwt.sign({ uuid: userData.uuid }, process.env.TOKEN_SECRET);
  userData.uuid = token;
  res
    // .header("auth-token", token)
    .status(200)
    .send(userData);
}

async function updateProfile(req, res) {
  console.log("udpate profile", req.body);
  // let errors = await Validation.ProfileValidation(req.body);
  // if (!isEmpty(errors)) return res.status(208).send(errors);

  // try {
  //   if (!(await modelUser.findOne(req.body.loginRef, "login")))
  //     return res.status(206).send("You don't exist in the database");
  // } catch (err) {
  //   res.status(209).send(err);
  // }
  // try {
  //   const data = await modelUser.updateUser(req.body, res);
  //   res.status(200).send(data);
  // } catch (err) {
  //   res.status(210).send(err);
  // }
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

function gUsers(req, res) {
  modelUser.gUsers(req, res);
}

function delUsers(req, res) {
  modelUser.delUsers(req, res);
}

function getUsers(req, res) {
  modelUser.getUsers(req, res);
}

module.exports = {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers,
  updateProfile
};
