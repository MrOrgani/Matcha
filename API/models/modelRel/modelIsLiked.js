const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();

async function modelIsLiked(req) {
  const data = await session.run(
    `MATCH (u:User {login:{source}})-[r:LIKES]->(n:User {login:{
      target}}) RETURN r`,
    req
  );
  return data.records;
}

module.exports = {
  modelIsLiked
};
