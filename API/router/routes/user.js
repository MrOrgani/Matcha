const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const { updateProfile } = require("../../controlers/profile/updateProfile");
const { addPicture } = require("../../controlers/profile/handlePictures");
const { addHobbies } = require("../../controlers/other/addHobbies");
const {
  dataProfileValidation,
  dataRegisterValidation,
  dataLoginValidation
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
  cryptAndObjectify,
  findOne
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
  .post(userVerif, (req, res) => {
    addPicture(req, res);
  })
  .patch(userVerif, dataProfileValidation, (req, res) => {
    updateProfile(req, res);
  });

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

router.route("/findOne").get(userVerif, (req, res) => {
  // console.log(req);
  // console.log(req.query);
  findOne(req, res);
  // console.log(res);
});

// router.route("/generate");
// .post((req, res) => {
//   req.body.value ? gUsers(req, res) : delUsers(req, res);
// })

module.exports = router;
