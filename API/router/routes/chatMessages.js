const router = require("express").Router();

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");

//FINALWARE
const { newMessages } = require("../../controlers/chat/newMessages");
const { getMessages } = require("../../controlers/chat/getMessages");

router
  .route("/")
  .post(userVerif, (req, res) => {
    newMessages(req, res);
  })
  .get(userVerif, (req, res) => {
    getMessages(req, res);
  });

module.exports = router;
