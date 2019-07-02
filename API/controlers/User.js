const ModelUser = require("../models/User");

async function createUser(req, res) {
  //check if email already exists
  // const emailExist = await User.findOne({ email: req.body.email });
  // if (emailExist) return res.status(400).send("Email already exists");
  ModelUser.createUser(req, res);
}

async function gUsers(req, res) {
  ModelUser.gUsers(req, res);
}

async function delUsers(req, res) {
  ModelUser.delUsers(req, res);
}

async function getUsers(req, res) {
  ModelUser.getUsers(req, res);
}

module.exports = {
  createUser,
  gUsers,
  delUsers,
  getUsers
};
