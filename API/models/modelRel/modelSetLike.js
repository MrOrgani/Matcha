const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelSetLike(req) {
  const data = await session.run(
    `MATCH (s:User {login:{userSource}}), (t:User {login:{target}})
    CREATE (s)-[r:LIKES]->(t)
    RETURN r`,
    req
  );
  return data;
}

module.exports = {
  modelSetLike
};
