// const neo4j = require("neo4j-driver").v1;
// const driver = neo4j.driver(
//   "bolt://localhost",
//   neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
//   () => console.log("connected to db")
// );
// const session = driver.session();

const { initNeo4j } = require("../../initNeo4j");
const session = initNeo4j();

async function modelIsBlocked(req) {
  try {
    const data = await session.run(
      `MATCH (u:User {login:{userSource}})-[r:BLOCKED]->(n:User {login:{
      target}}) RETURN r`,
      req
    );
    // REPLACED BY A BOOLEAN ANSWER
    return data.records.length > 0 ? true : false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelIsBlocked
};
