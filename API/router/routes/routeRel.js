const router = require("express").Router();

// MIDDLEWARE
const userVerif = require("../../controlers/user/middleware/userVerif");
const { isLiked } = require("../../controlers/rel/isLiked");
const { setLike } = require("../../controlers/rel/setLike");
const { isBlocked } = require("../../controlers/rel/isBlocked");
const { setBlock } = require("../../controlers/rel/setBlock");
const { newVisit } = require("../../controlers/rel/newVisit");

router
  .route("/like")
  .post(userVerif, (req, res) => {
    setLike(req, res);
  })
  .get((req, res) => {
    isLiked(req, res);
  });

router
  .route("/block")
  .post(userVerif, (req, res) => {
    setBlock(req, res);
  })
  .get((req, res) => {
    isBlocked(req, res);
  });

router.route("/visit").post(userVerif, (req, res) => {
  newVisit(req, res);
});

module.exports = router;
