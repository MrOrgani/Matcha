const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelDeleteNotif(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {uuid:{uuidSource}})
      SET u.notifs = []`,
      req
    );
    return data.records;
  } catch (err) {
    console.log("modelDeleteNotif", err, req);
  }
}

module.exports = {
  modelDeleteNotif
};
