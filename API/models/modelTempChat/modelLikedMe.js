const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelLikedMe(req) {
  try {
    const data = await session.run(
      `MATCH (u:User)-[r:LIKED]->(n:User {login:{userSource}}) RETURN u`,
      req
    );
    return data.records;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelLikedMe
};
