const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelGetNotif(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})
      RETURN u.notifs`,
      req
    );
    return data.records[0] && data.records[0]._fields[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelGetNotif
};
