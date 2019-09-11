const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelNewVisit(req) {
  try {
    // console.log("req modelNewVisit", req);
    await session.run(
      `MATCH (s:User {uuid:{uuidSource}}), (t:User {uuid:{target}})
    MERGE (s)-[r:VISITED]->(t)`,
      req
    );
  } catch (err) {
    console.log("Error ModelNewVisit", err, req);
  }
}

module.exports = {
  modelNewVisit
};
