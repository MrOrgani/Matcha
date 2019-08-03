const router = require("express").Router();

const { iMatched } = require("../../controlers/tempchat/matched");
const { likedMe } = require("../../controlers/tempchat/likedMe");
const { iLiked } = require("../../controlers/tempchat/iLiked");
const { visitedMe } = require("../../controlers/tempchat/visitedMe");
const { iVisited } = require("../../controlers/tempchat/iVisited");
const { iBlocked } = require("../../controlers/tempchat/iBlocked");

router.route("/matched").get((req, res) => iMatched(req, res));
router.route("/likedMe").get((req, res) => likedMe(req, res));
router.route("/liked").get((req, res) => iLiked(req, res));
router.route("/visitedMe").get((req, res) => visitedMe(req, res));
router.route("/visited").get((req, res) => iVisited(req, res));
router.route("/blocked").get((req, res) => iBlocked(req, res));

module.exports = router;
