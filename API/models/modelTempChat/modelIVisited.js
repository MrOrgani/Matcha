const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelIVisited(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {login:{userSource}})-[r:VISITED]->(n:User) RETURN n`,
      req
    );
    return data.records;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelIVisited
};
