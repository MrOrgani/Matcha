const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");
const { modelUserVerif } = require("../../models/modelUserVerif");
const {
  modelUpdateProfileImage
} = require("../../models/modelProfile/modelUpdateProfileImage");
const Validation = require("../Validation");
const modelUser = require("../../models/modelUser");

// UPDATE INFOS  FROM PROFILE PAGE
async function updateProfile(req, res) {
  // console.log("IN HERe");
  console.log("BODY REQ", req.body);
  if (!(await modelUserVerif(req.body))) {
    res.status(206).send("Error on user");
    return;
  }
  if (req.body.addPic || req.body.delPic) modelUpdateProfileImage(req);
  //   // UPDATE INFOS ENTERED IN FORM PROFILE
  let errors = await Validation.ProfileValidation(req.body);
  if (!isEmpty(errors)) return res.status(208).send(errors);

  try {
    if (!(await modelUser.findOne(req.body.userSource, "login")))
      return res.status(206).send("You don't exist in the database");
  } catch (err) {
    res.status(206).send("Error with find one ?");
  }
  try {
    const data = await modelUpdateProfile(req.body, res);
    res.status(200).send(data);
  } catch (err) {
    res.status(210).send(err);
  }
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

module.exports = {
  updateProfile
};
