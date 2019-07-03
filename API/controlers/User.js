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
  const PropNode = "login";
  const PropNodeExists = await ModelUser.findOne(req.body.login, PropNode);
  if (PropNodeExists) return res.status(206).send(`${PropNode} already exists`);

  let errors = await Validation.User(req.body);
  if (!isEmpty(errors)) return res.status(206).send(errors);

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
