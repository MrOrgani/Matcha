const router = require("express").Router();
const { tempChat } = require("../../controlers/tempchat/tempChat");

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");

router.route("/affinities").get(userVerif, (req, res) => tempChat(req, res));

module.exports = router;
