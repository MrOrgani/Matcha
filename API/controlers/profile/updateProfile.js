const {
  modelUpdateProfile
} = require("../../models/modelProfile/modelUpdateProfile");
const { modelUserVerif } = require("../../models/modelUserVerif");
const {
  modelUpdateProfileImage
} = require("../../models/modelProfile/modelUpdateProfileImage");

// UPDATE INFOS  FROM PROFILE PAGE
async function updateProfile(req, res) {
  console.log("udpate profile", req.body);
  if (!(await modelUserVerif(req.body))) {
    res.status(206).send("");
    return;
  }
  // UPDATE IMAGES
  if (req.body.imageAdd || req.body.imageDel) {
    try {
      const data = await modelUpdateProfileImage(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(210).send(err);
    }
  }
  //   // UPDATE INFOS ENTERED IN FORM PROFILE
  let errors = await Validation.ProfileValidation(req.body);
  if (!isEmpty(errors)) return res.status(208).send(errors);

  try {
    if (!(await modelUser.findOne(req.body.loginRef, "login")))
      return res.status(206).send("You don't exist in the database");
  } catch (err) {
    res.status(206).send(err);
  }
  try {
    const data = await modelUpdateProfile(req.body, res);
    res.status(200).send(data);
  } catch (err) {
    res.status(210).send(err);
  }
}

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

async function addPicture(req, res) {
  console.log("values", req);
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  console.log("promises", promises);

  Promise.all(promises).then(results => {
    res.json(results);
    console.log("res", results);
  });
}

module.exports = {
  updateProfile,
  addPicture
};
