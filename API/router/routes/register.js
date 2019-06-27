var express = require("express");
var router = express.Router();

router
  .get("/", function(req, res, next) {
    console.log(req);
    // res.send(req);
    res.send("API is working properly");
  })
  .post("/", function(req, res) {
    console.log(req);
    res.writeHead(200);
    res.end("We received a post request");
  });

module.exports = router;
