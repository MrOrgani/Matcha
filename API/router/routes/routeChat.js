const router = require("express").Router();
const { Chat } = require("../../controlers/chat/chat");

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");

router.route("/affinities").get(userVerif, (req, res) => Chat(req, res));

module.exports = router;
