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
      .run("MATCH (u:User {isComplete=true}) RETURN u")
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
  .get("/withhobbies", async function(req, res) {
    try {
      const result = [];
      const user = await session.run(
        `MATCH (u:User {isComplete:true}),
          (t:User {uuid:'${req.query.uuidSource}'})
          WHERE u.uuid <> '${req.query.uuidSource}'
            AND (u.lookingFor = '${req.query.gender}' 
              OR u.lookingFor = 'both')
            AND NOT (u)-[:BLOCKED]->(t)
          RETURN u`
      );
      user.records.map(record => {
        const oneUser = record._fields[0].properties;
        const now = new Date();
        oneUser.lastConnection = date.format(now, "ddd MMM DD YYYY");
        oneUser.age = oneUser.age.low ? oneUser.age.low : oneUser.age;
        oneUser.indexOfPP =
          oneUser.indexOfPP.low === 0
            ? oneUser.indexOfPP.low
            : oneUser.indexOfPP;
        result.push(oneUser);
      });
      res.status(200).send(result);
    } catch (err) {
      console.log("err getuser: ", err, req);
    }
  });

module.exports = router;
