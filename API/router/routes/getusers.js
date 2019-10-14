const express = require("express");
const router = express.Router();
const date = require("date-and-time");
const neo4j = require("neo4j-driver").v1;
const low = require("../../models/low");
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "2j54A%")
);
const session = driver.session();

// "MIDLEWARE FUNCTIONS"
const formate = async (arr, hobbiesSource = false) => {
  const acc = [];
  await arr.records.forEach(async node => {
    const oneUser = low(node._fields[0].properties);
    const now = new Date();
    oneUser.lastConnection = date.format(now, "ddd MMM DD YYYY");
    if (hobbiesSource) {
      await (async () => {
        oneUser.similarityScore = await oneUser.hobbies.reduce(
          (accumulator, hobbyOneUser) => {
            if (hobbiesSource.includes(hobbyOneUser)) return accumulator + 1;
            else return accumulator;
          },
          0
        );
      })();
    }
    acc.push(oneUser);
  }, []);
  return acc;
};

const createCypher = req => {
  let cypher = `MATCH (targ:User {isComplete:true}),
  (me:User {uuid:'${escape(req.query.uuidSource)}'})
  WHERE targ.uuid <> '${escape(req.query.uuidSource)}'
    AND (targ.lookingFor = '${escape(req.query.gender)}' 
    OR targ.lookingFor = 'both')`;
  cypher +=
    req.query.lookingFor === "both"
      ? ""
      : ` AND (targ.gender = '${escape(req.query.lookingFor)}')`;
  // console.log(cypher);
  return cypher;
};

/* GET home page. */
router
  .get("/withhobbies", async function(req, res) {
    try {
      let cypher = createCypher(req);
      cypher += ` AND NOT (me)-[:BLOCKED]->(targ)
                    RETURN targ`;
      res.status(200).send(await formate(await session.run(cypher)));
    } catch (err) {
      console.log("err getuser: ", err);
    }
  })
  .post("/matcher", async function(req, res) {
    const hobbiesSource = JSON.parse(req.body.hobbies);
    (() => {
      req.body.gender = escape(req.body.gender);
      req.body.uuidSource = escape(req.body.uuidSource);
    })();
    try {
      let cypher = `MATCH (n:User {uuid:'${escape(
        req.body.uuidSource
      )}'})-[:LIKED]->(crush)<-[:LIKED]-(rival)-[:LIKED]->(other)
      WHERE other <> n AND other <> crush
      AND (other.lookingFor = '${escape(req.body.gender)}' 
    OR other.lookingFor = 'both')`;
      cypher +=
        req.body.lookingFor === "both"
          ? ""
          : ` AND (other.gender = '${escape(req.body.lookingFor)}')`;
      cypher += ` AND NOT (n)-[:BLOCKED]->(other)
                      AND NOT (n)-[:LIKED]->(other)
                    RETURN DISTINCT other`;
      // console.log("get user cypher", cypher);
      res
        .status(200)
        .send(await formate(await session.run(cypher), hobbiesSource));
    } catch (err) {
      console.log("err getuser: ", err, req.body);
    }
  });

module.exports = router;
