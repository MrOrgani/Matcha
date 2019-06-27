const ModelUser = require("../models/User");

async function createUser(req, res) {
  //check if email already exists
  // const emailExist = await User.findOne({ email: req.body.email });
  // if (emailExist) return res.status(400).send("Email already exists");
  ModelUser.createUser(req, res);
}

module.exports = {
  createUser
};
