const ModelUser = require("../models/User");
const Validation = require("./Validation");

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

async function createUser(req, res) {
  // Check if we can create user
  let errors = await Validation.User(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

  const EmailExists = await ModelUser.findOne(req.body, "email");
  console.log(EmailExists);
  if (EmailExists) return res.status(206).send("Email Already exists");

  // Eventually create the damn user
  try {
    ModelUser.createUser(req.body, res);
  } catch (err) {
    res.status(206).send(err);
  }
}

module.exports = {
  createUser
};
