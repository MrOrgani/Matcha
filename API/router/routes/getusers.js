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
      let cypher = `MATCH (targ:User {isComplete:true}),
                    (me:User {uuid:'${req.query.uuidSource}'})
                    WHERE targ.uuid <> '${req.query.uuidSource}'
                      AND (targ.lookingFor = '${req.query.gender}' 
                      OR targ.lookingFor = 'both')`;
      cypher +=
        req.query.lookingFor === "both"
          ? ""
          : ` AND (targ.gender = '${req.query.lookingFor}')`;
      cypher += ` AND NOT (me)-[:BLOCKED]->(targ)
                    RETURN targ`;
      const user = await session.run(cypher);
      user.records.map(record => {
        const oneUser = record._fields[0].properties;
        const now = new Date();
        oneUser.lastConnection = date.format(now, "ddd MMM DD YYYY");
        result.push(oneUser);
      });
      res.status(200).send(result);
    } catch (err) {
      console.log("err getuser: ", err);
    }
  })
  .get("/matcher", async function(req, res) {
    try {
      const result = [];
      let cypher = `MATCH (targ:User {isComplete:true}),
                    (me:User {uuid:'${req.query.uuidSource}'})
                    WHERE targ.uuid <> '${req.query.uuidSource}'
                      AND (targ.lookingFor = '${req.query.gender}' 
                      OR targ.lookingFor = 'both')`;
      cypher +=
        req.query.lookingFor === "both"
          ? ""
          : ` AND (targ.gender = '${req.query.lookingFor}')`;
      cypher += ` AND NOT (me)-[:BLOCKED]->(targ)
                      AND NOT (me)-[:LIKED]->(targ)
                    RETURN targ`;
      console.log("CYPER MATCH", cypher);
      const user = await session.run(cypher);

      user.records.map(record => {
        const oneUser = record._fields[0].properties;
        const now = new Date();
        oneUser.lastConnection = date.format(now, "ddd MMM DD YYYY");
        result.push(oneUser);
      });
      res.status(200).send(result);
    } catch (err) {
      console.log("err getuser: ", err, req.query, req.body);
    }
  });

module.exports = router;
