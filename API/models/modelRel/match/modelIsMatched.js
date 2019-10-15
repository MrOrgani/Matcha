const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelIsMatched(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})-[r:MATCHED]-(n:User {uuid:{target}})
        RETURN r`,
      req
    );
    // REPLACED BY A BOOLEAN ANSWER
    return data.records.length > 0 ? true : false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelIsMatched
};
