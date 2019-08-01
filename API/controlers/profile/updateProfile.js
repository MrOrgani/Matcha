const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");
// const { modelUserVerif } = require("../../models/modelUserVerif");
// const {
//   modelUpdateProfileImage
// } = require("../../models/modelProfile/modelUpdateProfileImage");
// const Validation = require("../Validation");
// const modelUser = require("../../models/modelUser");

// UPDATE INFOS  FROM PROFILE PAGE
async function updateProfile(req, res) {
  // console.log("IN HERe");
  // console.log("BODY REQ", req.body);

  // ---------------- DONE IN MIDDLEWARE
  // if (!(await modelUserVerif(req.body))) {
  //   res.status(206).send("Error on user");
  //   return;
  // }
  // if (req.body.addPic || req.body.delPic) modelUpdateProfileImage(req);
  //   // UPDATE INFOS ENTERED IN FORM PROFILE
  // ----------------------------------

  // ---------------- DONE IN MIDDLEWARE
  // let errors = await Validation.ProfileValidation(req.body);
  // if (!isEmpty(errors)) return res.status(401).send(errors);
  // ----------------------------------

  // ---------------- INUTILE ?
  // try {
  //   if (!(await modelUser.findOne(req.body.userSource, "login")))
  //     return res.status(206).send("You don't exist in the database");
  // } catch (err) {
  //   res.status(206).send("Error with find one ?");
  // }
  // ----------------------------------
  try {
    const data = await modelUpdateProfile(req.body);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
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
