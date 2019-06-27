var express = require("express");
var router = express.Router();

router
  .get("/", function(req, res, next) {
    console.log(req);
    // res.send(req);
    res.send("API is working properly");
  })
  .post("/", function(req, res) {
    res.writeHead(200, { "Content-Type": "text/event-stream" });
    console.log(req);
    req.send("We received a post request");
  });

module.exports = router;
