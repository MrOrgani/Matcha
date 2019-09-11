const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelNewMessages(req) {
  const messageJSON = {
    uuidSource: req.uuidSource,
    h: req.h,
    m: req.m,
    content: req.content
  };
  req.newMessage = [JSON.stringify(messageJSON)];
  try {
    const data = await session.run(
      `MATCH (s:User {uuid:{uuidSource}})-[r:MESSAGED]-(t:User {uuid:{target}})
      SET r.history = r.history + {newMessage}`,
      req
    );
    return data.records;
  } catch (err) {
    console.log("error in modelNewMessages", err);
  }
}

module.exports = {
  modelNewMessages
};
