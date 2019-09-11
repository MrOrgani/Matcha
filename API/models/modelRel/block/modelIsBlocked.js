const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelIsBlocked(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})-[r:BLOCKED]->(n:User {uuid:{
      target}}) RETURN r`,
      req
    );
    // REPLACED BY A BOOLEAN ANSWER
    return data.records.length > 0 ? true : false;
  } catch (err) {
    console.log("modelisBlocked", err, req);
  }
}

module.exports = {
  modelIsBlocked
};
