const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetLike(req) {
  try {
    console.log("req model SetLike", req);
    await session.run(
      `MATCH (s:User {uuid:{uuidSource}}), (t:User {uuid:{target}})
    MERGE (s)-[r:LIKED]->(t)`,
      req
    );
  } catch (err) {
    console.log("Error modelSetLike", err, req);
    res.status(400).send();
  }
}

module.exports = {
  modelSetLike
};
