const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelSetUnlike(req) {
  const data = await session.run(
    `MATCH (s:User {login:{userSource}})-[r:LIKES]->(t:User {login:{target}})
    DELETE r`,
    req
  );
  return data;
}

module.exports = {
  modelSetUnlike
};
