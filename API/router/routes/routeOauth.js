const router = require("express").Router();

const passport = require("passport");

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");

// router.route("/42").get(passport.authenticate("42"));
router.route("/42").get(
  passport.authenticate("42", (req, res) => {
    console.log("req from /42 Authentificate", req);
  }),
  (req, res) => {
    res.status(200).send("/42 classic");
  }
);

router.route("/42/redirect").get(
  passport.authenticate("42", (req, res) => {
    //   console.log(req.user);
    console.log("coucou");
    //   passport.authenticate('42', { failureRedirect: '/login' }),
    //   function(req, res) {
    //     res.redirect('/');
    //   });
    res.status(200).send("redirect");
  })
);

module.exports = router;
