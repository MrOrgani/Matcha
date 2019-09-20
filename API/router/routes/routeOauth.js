const passport = require("passport");
const passportSuccess = require("../../passport/passportSuccess");
const router = require("express").Router();

router.route("/42").get(passport.authenticate("42"));
router
  .route("/42/redirect")
  .get(
    passport.authenticate("42", { failureRedirect: "api/Oauth/42/failure" }),
    (req, res) => passportSuccess(req, res)
  );
router
  .route("/42/failure")
  .get(passport.authenticate("42"), (req, res) =>
    res.redirect("htt[://localhost:3000")
  );

module.exports = router;
