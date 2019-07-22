const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();
const jwt = require("jsonwebtoken");

async function modelUserVerif(req) {
  if (!req.jwt) return false;
  const verified = await jwt.verify(req.jwt, process.env.TOKEN_SECRET);
  const result = await session
    .run(`MATCH (u:User {login: {userSource}, uuid:{uuid}}) RETURN u`, {
      userSource: req.userSource,
      uuid: verified.uuid
    })
    .then(data => {
      if (data.records.length === 0) {
        return false;
      } else return true;
    });
  return result;
}

module.exports = {
  modelUserVerif
};
