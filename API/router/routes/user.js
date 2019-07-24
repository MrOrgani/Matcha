const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const { updateProfile } = require("../../controlers/profile/updateProfile");
const { addPicture } = require("../../controlers/profile/handlePictures");
const { addHobbies } = require("../../controlers/other/addHobbies");

const app = express();
app.use(fileUpload());

const {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers
} = require("../../controlers/User");

router
  .route("/")
  .delete((req, res) => {
    delUsers(req, res);
  })
  .head((req, res) => {
    gUsers(req, res);
  })
  .get((req, res) => {
    addHobbies(req, res);
  });

router
  .route("/profile")
  .patch((req, res) => {
    updateProfile(req, res);
  })
  .post((req, res) => {
    addPicture(req, res);
  });

//=========================================================
// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// router.route("/image-upload").post((req, res) => {
//   console.log("values", req.files);
//   const values = Object.values(req.files);
//   const promises = values.map(image => cloudinary.uploader.upload(image.path));
//   console.log("promises", promises);

//   Promise.all(promises).then(results => {
//     res.json(results);
//     console.log("res", results);
//   });
// });
//=========================================================
router
  .route("/register")
  .post((req, res) => {
    createUser(req, res);
  })
  .get((req, res) => {
    getUsers(req, res);
  });

router.route("/login").post((req, res) => {
  loginUser(req, res);
});

// router.route("/generate");
// .post((req, res) => {
//   req.body.value ? gUsers(req, res) : delUsers(req, res);
// })

module.exports = router;
