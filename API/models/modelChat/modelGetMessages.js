const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelGetMessages(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})-[r:MESSAGED]-(n:User {uuid:{target}}) RETURN r`,
      {
        uuidSource: req.uuidSource,
        target: req.target
      }
    );
    return data.records[0]
      ? data.records[0]._fields[0].properties.history
      : null;
  } catch (err) {
    console.log("Error on ModelGetMessages: ", err);
  }
}

module.exports = {
  modelGetMessages
};
