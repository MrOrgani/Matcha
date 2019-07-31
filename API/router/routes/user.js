const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const { updateProfile } = require("../../controlers/profile/updateProfile");
const { addPicture } = require("../../controlers/profile/handlePictures");
const { addHobbies } = require("../../controlers/other/addHobbies");
const formData = require("express-form-data");
const { dataProfileValidation } = require("./../../controlers/Validation");

const app = express();
app.use(fileUpload());

const {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers,
  isAuthenticated
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
  .patch(isAuthenticated, dataProfileValidation, (req, res) => {
    updateProfile(req, res);
  })
  .post((req, res) => {
    addPicture(req, res);
  });

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
