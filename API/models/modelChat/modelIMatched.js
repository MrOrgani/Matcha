const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelIMatched(req) {
  console.log(req);
  try {
    const data = await session.run(
      `MATCH (u:User {login:{userSource}})-[r:MATCHED]-(n:User) RETURN n`,
      req
    );
    // console.log(data.records);
    return data.records;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelIMatched
};
