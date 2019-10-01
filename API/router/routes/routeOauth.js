const passport = require("passport");
const passportSuccess = require("../../passport/passportSuccess");
const router = require("express").Router();

router.route("/42").get(passport.authenticate("42"));
router
  .route("/42/redirect")
  .get(
    passport.authenticate("42", { failureRedirect: "failure" }),
    (req, res) => passportSuccess(req, res)
  );
router
  .route("/42/failure")
  .get((req, res) => res.redirect("http://localhost:3000"));

module.exports = router;
