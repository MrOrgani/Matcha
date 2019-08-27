const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const { updateProfile } = require("../../controlers/profile/updateProfile");
const { addPicture } = require("../../controlers/profile/handlePictures");
const {
  addHobbiesAndCity
} = require("../../controlers/other/addHobbiesAndCity");
const {
  dataProfileValidation,
  dataRegisterValidation,
  dataLoginValidation,
  checkPasswordIsChanged
} = require("./../../controlers/Validation");

const app = express();
app.use(fileUpload());

const {
  createUser,
  loginUser,
  gUsers,
  delUsers,
  getUsers,
  userVerif,
  loginOrEmailNotTaken,
  cryptAndObjectify
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
    addHobbiesAndCity(req, res);
  });

router
  .route("/profile")
  .post(userVerif, (req, res) => {
    addPicture(req, res);
  })
  .patch(
    userVerif,
    checkPasswordIsChanged,
    cryptAndObjectify,
    dataProfileValidation,
    (req, res) => {
      updateProfile(req, res);
    }
  );

router
  .route("/register")
  .post(
    loginOrEmailNotTaken,
    dataRegisterValidation,
    cryptAndObjectify,
    (req, res) => {
      createUser(req, res);
    }
  )
  .get((req, res) => {
    getUsers(req, res);
  });

router.route("/login").post(
  dataLoginValidation,
  // cryptAndObjectify,
  (req, res) => {
    loginUser(req, res);
  }
);

// router.route("/generate");
// .post((req, res) => {
//   req.body.value ? gUsers(req, res) : delUsers(req, res);
// })

module.exports = router;
