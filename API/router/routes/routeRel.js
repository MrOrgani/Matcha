const router = require("express").Router();
const fetch = require("node-fetch");

const { isLiked } = require("../../controlers/rel/isLiked");
const { setLike } = require("../../controlers/rel/setLike");

router
  .route("/Like")
  .post((req, res) => {
    setLike(req, res);
  })
  .get((req, res) => {
    isLiked(req, res);
  });

module.exports = router;
