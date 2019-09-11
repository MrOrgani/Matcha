const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetMatched(req) {
  try {
    session.run(
      `MATCH (s:User {uuid:{uuidSource}}), (t:User {uuid:{target}})
        CREATE (s)-[:MATCHED]->(t)`,
      req
    );
  } catch (err) {
    console.log("Error model SET MATCHED", err, req);
    res.status(400).send();
  }
}

module.exports = {
  modelSetMatched
};
