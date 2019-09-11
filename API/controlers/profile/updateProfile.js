const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");
const modelFindOne = require("../../models/modelUser/modelFindOne");
const cleanUserData = require("../user/cleanUserData");

// UPDATE INFOS  FROM PROFILE PAGE
exports.updateProfile = async (req, res) => {
  try {
    const data = await modelUpdateProfile(req);
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    let data = await modelFindOne(
      req.query.uuidSource,
      "uuid",
      `SET u.location = [${req.body.lat}, ${req.body.lon}]`
    );
    // console.log("data ", data);
    data = cleanUserData(data[0]._fields[0].properties);
    // console.log("data after clean ", data);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};
