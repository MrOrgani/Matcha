const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelIVisited(req) {
  // console.log('req is', req)
  const data = await session.run(
    `MATCH (u:User {login:{userSource}})-[r:VISITED]->(n:User) RETURN n`,
    req
  );
  // console.log('data is', data.records)
  return data.records;
}

module.exports = {
  modelIVisited
};
