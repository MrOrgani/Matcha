const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelIsBlocked(req) {
  // console.log(req);
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})-[r:BLOCKED]->(n:User {uuid:{
      target}}) RETURN r`,
      req
    );
    return data.records.length > 0 ? true : false;
  } catch (err) {
    console.log("modelisBlocked", err);
  }
}

module.exports = {
  modelIsBlocked
};
