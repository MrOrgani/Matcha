const router = require("express").Router();

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");

//FINALWARE
const { newMessages } = require("../../controlers/tempchat/newMessages");
const { getMessages } = require("../../controlers/tempchat/getMessages");

router
  .route("/")
  .post(userVerif, (req, res) => {
    // console.log("coucou");
    newMessages(req, res);
  })
  .get(userVerif, (req, res) => {
    getMessages(req, res);
  });

module.exports = router;
