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
    // return await accumulator.concat(oneUser);
  }, []);
  console.log(hobbiesSource);
  return acc;

  return arr.records.reduce(async (accumulator, node) => {
    console.log(accumulator, node);
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
    return await accumulator.concat(oneUser);
  }, []);
  console.log([]);
};

const createCypher = req => {
  let cypher = `MATCH (targ:User {isComplete:true}),
  (me:User {uuid:'${req.query.uuidSource}'})
  WHERE targ.uuid <> '${req.query.uuidSource}'
    AND (targ.lookingFor = '${req.query.gender}' 
    OR targ.lookingFor = 'both')`;
  cypher +=
    req.query.lookingFor === "both"
      ? ""
      : ` AND (targ.gender = '${req.query.lookingFor}')`;
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
  .get("/matcher", async function(req, res) {
    const hobbiesSource = JSON.parse(req.query.hobbies);
    try {
      let cypher = createCypher(req);
      cypher += ` AND NOT (me)-[:BLOCKED]->(targ)
                      AND NOT (me)-[:LIKED]->(targ)
                    RETURN targ`;
      res
        .status(200)
        .send(await formate(await session.run(cypher), hobbiesSource));
    } catch (err) {
      console.log("err getuser: ", err, req.query);
    }
  });

module.exports = router;
