const modelUser = require("../../models/modelSeed/modelUser");

exports.gUsers = async (req, res) => {
  modelUser.gUsers();
  res.status(200).end();
};

exports.delUsers = (req, res) => {
  modelUser.delUsers(req, res);
  res.status(200).end();
};

exports.getUser = (req, res) => {
  modelUser.getUsers(req, res);
  res.status(200).end();
};
