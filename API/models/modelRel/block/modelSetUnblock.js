const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelSetUnblock(req) {
  const data = await session.run(
    `MATCH (s:User {login:{userSource}})-[r:BLOCKED]->(t:User {login:{target}})
    DELETE r`,
    req
  );
  return data;
}

module.exports = {
  modelSetUnblock
};
