const router = require("express").Router();
const fetch = require("node-fetch");

const { isLiked } = require("../../controlers/rel/isLiked");
const { setLike } = require("../../controlers/rel/setLike");
const { isBlocked } = require("../../controlers/rel/isBlocked");
const { setBlock } = require("../../controlers/rel/setBlock");

router
  .route("/Like")
  .post((req, res) => {
    setLike(req, res);
  })
  .get((req, res) => {
    isLiked(req, res);
  });

router
  .route("/block")
  .post((req, res) => {
    setBlock(req, res);
  })
  .get((req, res) => {
    isBlocked(req, res);
  });

module.exports = router;
