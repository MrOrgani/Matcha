const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelNewMessages(req) {
  const messageJSON = {
    uuidSource: req.uuidSource,
    h: req.h,
    m: req.m,
    content: req.content
  };
  const arrayMessages = [JSON.stringify(messageJSON)];
  console.log(req);
  try {
    const data = await session.run(
      `MATCH (s:User {uuid:{uuidSource}})-[r:MESSAGED]-(t:User {uuid:{target}})
      SET r.history = r.history + {newMessage}`,
      {
        newMessage: arrayMessages,
        uuidSource: req.uuidSource,
        target: req.target
      }
    );
    console.log(data.records);
    return data.records;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelNewMessages
};
