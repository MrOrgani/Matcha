const express = require("express");
const router = express.Router();
const date = require("date-and-time");
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "2j54A%")
);
const session = driver.session();

/* GET home page. */
router
  .get("/", function(req, res) {
    const result = [];
    session
      .run("MATCH (u:User {isComplete: 1}) RETURN u")
      .then(nodes => {
        nodes.records.forEach(record => {
          result.push(record._fields[0].properties);
        });
      })
      .then(function() {
        res.send(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  })
  .get("/withhobbies", function(req, res) {
    const result = [];
    session
      .run(
        `MATCH (u:User)-[:PRACTICE]-(hobby)
          WHERE u.isComplete = 1 RETURN u, collect(hobby)`
      )
      .then(nodes => {
        nodes.records.forEach(record => {
          const user = record._fields[0].properties;
          const hobbies = [];
          record._fields[1].forEach(hobby => {
            hobbies.push(hobby.properties.name);
          });
          const now = new Date();
          user.hobbies = hobbies;
          user.lastConnection = date.format(now, "ddd MMM DD YYYY");
          result.push(user);
        });
      })
      .then(() => {
        res.send(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

module.exports = router;
