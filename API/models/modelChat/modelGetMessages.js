const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelGetMessages(req) {
  // console.log(req);
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})-[r:MESSAGED]-(n:User {uuid:{target}}) RETURN r`,
      {
        uuidSource: req.uuidSource,
        target: req.target
      }
    );
    // console.log(data.records[0]._fields[0].properties.history || null);
    return data.records[0]._fields[0].properties.history || null;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelGetMessages
};
