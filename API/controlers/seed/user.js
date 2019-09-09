const modelUser = require("../../models/modelSeed/modelUser");
const uuid = require("uuid/v4");

exports.gUsers = async (req, res) => {
  const baseScore = JSON.stringify({
    like: 0,
    visit: 0,
    block: 0
  });
  req.body.uuid = await uuid();
  req.body.baseScore = baseScore;
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
