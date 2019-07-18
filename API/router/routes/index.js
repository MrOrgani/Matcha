const express = require("express");
const router = express.Router();

const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "2j54A%")
);
const session = driver.session();
/* GET home page. */
router.get("/", function(req, res, next) {
  const nodes = [];
  session
    .run("MATCH (u:User) WHERE (u.isComplete = 1) RETURN u")
    .then(function(result) {
      result.records.forEach(function(record) {
        nodes.push(record._fields[0].properties);
      });
    })
    .then(function() {
      // console.log(nodes);
      res.send(nodes);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// TEST setting cookies

module.exports = router;
