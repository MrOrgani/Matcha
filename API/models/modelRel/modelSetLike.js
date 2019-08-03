const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

async function modelSetLike(req) {
  try {
    const data = await session.run(
      `MATCH (s:User {login:{userSource}}), (t:User {login:{target}})
    CREATE (s)-[r:LIKED]->(t)
    RETURN r`,
      req
    );
    return data;
  } catch (err) {
    console.log("Error modelSetLike", err);
  }
}

module.exports = {
  modelSetLike
};
