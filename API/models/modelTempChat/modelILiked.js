const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelILiked(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {login:{userSource}})-[r:LIKED]->(n:User) RETURN n`,
      req
    );
    return data.records;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  modelILiked
};
