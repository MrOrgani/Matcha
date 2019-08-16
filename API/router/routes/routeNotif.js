const router = require("express").Router();

// MIDDLEWARE
const { userVerif } = require("../../controlers/User");

const { newNotif } = require("../../controlers/notif/newNotif");
const { getNotif } = require("../../controlers/notif/getNotif");
const { deleteNotif } = require("../../controlers/notif/deleteNotif");

router
  .route("/")
  .post(userVerif, (req, res) => {
    newNotif(req, res);
  })
  .get(userVerif, (req, res) => {
    // console.log("route", req.query);
    getNotif(req, res);
  });

router.route("/delete").post(userVerif, (req, res) => {
  deleteNotif(req, res);
});

module.exports = router;
