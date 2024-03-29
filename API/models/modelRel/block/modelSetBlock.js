const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetBlock(req) {
  try {
    const data = await session.run(
      `MATCH (s:User {uuid:{uuidSource}}), (t:User {uuid:{target}})
    CREATE (s)-[r:BLOCKED]->(t)
    RETURN r`,
      req
    );
    return data;
  } catch (err) {
    console.log("erro in modelSetBlock");
  }
}

module.exports = {
  modelSetBlock
};
