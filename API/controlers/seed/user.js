const modelUser = require("../../models/modelSeed/modelUser");
const uuid = require("uuid/v4");

exports.gUsers = async (req, res) => {
  modelUser.gUsers(req);
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
