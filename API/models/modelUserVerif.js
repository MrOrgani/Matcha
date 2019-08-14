// after you loggin you have a token, we verify the token with this middleware
// function every time we want a page to be authentificated
// https://www.youtube.com/watch?v=2jqok-WgelI&t=3386s at 1h03m
// testable with postman

const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(process.env.DB_LOGIN, process.env.DB_PWD),
  () => console.log("connected to db")
);
const session = driver.session();
const jwt = require("jsonwebtoken");

async function modelUserVerif(req) {
  // console.log("in modelUserVerif", req);
  try {
    if (!req.jwt) return false;
    const verified = await jwt.verify(req.jwt, process.env.TOKEN_SECRET);
    // console.log("verified", verified);
    const result = await session
      .run(`MATCH (u:User {login: {userSource}, uuid:{uuid}}) RETURN u`, {
        userSource: req.userSource,
        uuid: verified.uuid
      })
      .then(data => {
        if (data.records.length === 0) {
          return false;
        } else return true;
      })
      .catch(err => {
        return err;
      });
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelUserVerif
};
