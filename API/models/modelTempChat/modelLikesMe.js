const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelLikesMe(req) {
  // console.log('req is', req)
  const data = await session.run(
    `MATCH (u:User)-[r:LIKED]->(n:User {login:{userSource}}) RETURN u`,
    req
  );
  // console.log('data is', data.records)
  return data.records;
}

module.exports = {
  modelLikesMe
};
