var express = require("express");
var router = express.Router();
const verify = require("../../controlers/verifyToken");

router.get("/", verify, function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
