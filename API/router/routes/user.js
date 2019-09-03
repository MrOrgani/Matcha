const ctrlUsr = "../../controlers/user";

const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());

// MIDDLEWARES
const userVerif = require(`${ctrlUsr}/middleware/userVerif`);
const cryptNObject = require(`${ctrlUsr}/middleware/cryptAndObjectify`);
const existLogOrEmail = require(`${ctrlUsr}/middleware/ExistLogOrEmail`);
const dataProfileVal = require(`./${ctrlUsr}/validation/dataProfileVal`);
const dataRegisterVal = require(`./${ctrlUsr}/validation/dataRegisterVal`);
const dataLoginVal = require(`./${ctrlUsr}/validation/dataLoginVal`);
const changePass = require(`./${ctrlUsr}/validation/changePass`);

// FUNCTIONS
const { gUsers, delUsers, getUsers } = require(`../../controlers/seed/user`);
const { addTagNCity } = require("../../controlers/seed/addHobbiesAndCity");
const createUser = require(`${ctrlUsr}/createUser`);
const loginUser = require(`${ctrlUsr}/loginUser`);
const forgotPass = require(`${ctrlUsr}/forgotPass`);
const { updateProfile } = require("../../controlers/profile/updateProfile");
const confirmEmail = require("../../controlers/confirm/confirmEmail.js");
const findOne = require("../../controlers/user/findOne");

router
  .route("/")
  .delete((req, res) => {
    delUsers(req, res);
  })
  .head((req, res) => {
    gUsers(req, res);
  })
  .get((req, res) => {
    addTagNCity(req, res);
  });

router
  .route("/register")
  .post(existLogOrEmail, dataRegisterVal, cryptNObject, (req, res) => {
    createUser(req, res);
  })
  .get((req, res) => {
    getUsers(req, res);
  });

router.route("/confirm/:id").get((req, res) => confirmEmail(req, res));

router.route("/login").post(dataLoginVal, (req, res) => {
  loginUser(req, res);
});

router.route("/forgot").post((req, res) => {
  forgotPass(req, res);
});

router
  .route("/profile")
  // .post(userVerif, (req, res) => {
  // addPicture(req, res);
  // })
  .patch(
    userVerif,
    changePass,
    cryptNObject,
    // dataProfileVal,
    (req, res) => {
      updateProfile(req, res);
    }
  );

router.route("/findOne").get(userVerif, (req, res) => {
  findOne(req, res);
});

// router.route("/generate");
// .post((req, res) => {
//   req.body.value ? gUsers(req, res) : delUsers(req, res);
// })

module.exports = router;
