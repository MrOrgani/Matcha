const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");

// UPDATE INFOS  FROM PROFILE PAGE
exports.updateProfile = async (req, res) => {
  try {
    const data = await modelUpdateProfile(req);
    res.status(200).send(data);
  } catch (err) {
    res.status(401).send(err);
  }
};
