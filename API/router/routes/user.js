const ctrlUsr = "../../controlers/user";

const router = require("express").Router();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());

// MIDDLEWARES
const cryptNObject = require(`${ctrlUsr}/middleware/cryptAndObjectify`);
const existLogOrEmail = require(`${ctrlUsr}/middleware/ExistLogOrEmail`);
const dataProfileVal = require(`./${ctrlUsr}/validation/dataProfileVal`);
const dataRegisterVal = require(`./${ctrlUsr}/validation/dataRegisterVal`);
const dataLoginVal = require(`./${ctrlUsr}/validation/dataLoginVal`);
const changePass = require(`./${ctrlUsr}/validation/changePass`);
const userVerif = require(`../../controlers/user/middleware/userVerif`);

// FUNCTIONS
const { gUsers, delUsers, getUsers } = require(`${ctrlUsr}/User`);
const { addTagNCity } = require("../../controlers/other/addHobbiesAndCity");
const createUser = require(`${ctrlUsr}/createUser`);
const loginUser = require(`${ctrlUsr}/loginUser`);
const { updateProfile } = require("../../controlers/profile/updateProfile");

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

router
  .route("/register")
  .post(existLogOrEmail, dataRegisterVal, cryptNObject, (req, res) => {
    createUser(req, res);
  })
  .get((req, res) => {
    getUsers(req, res);
  });

router.route("/login").post(dataLoginVal, (req, res) => {
  loginUser(req, res);
});

module.exports = router;
