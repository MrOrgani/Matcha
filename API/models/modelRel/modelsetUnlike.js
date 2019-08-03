// const neo4j = require("neo4j-driver").v1;
// const driver = neo4j.driver(
//   "bolt://localhost",
//   neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
//   () => console.log("connected to db")
// );
// const session = driver.session();

const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();

// async function modelSetUnlike(req) {
exports.modelSetUnlike = async req => {
  try {
    const data = await session.run(
      `MATCH (s:User {login:{userSource}})-[r:LIKED]->(t:User {login:{target}})
    DELETE r`,
      req
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// module.exports = {
//   modelSetUnlike
// };
