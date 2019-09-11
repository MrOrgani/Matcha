const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetUnMatched(req) {
  try {
    session.run(
      `MATCH (s:User {uuid:{uuidSource}})-[r:MATCHED]-(t:User {uuid:{target}})
    DELETE r`,
      req
    );
  } catch (err) {
    console.log("Error model SET UNMATCHED", err, req);
    res.status(400).send();
  }
}

module.exports = {
  modelSetUnMatched
};
