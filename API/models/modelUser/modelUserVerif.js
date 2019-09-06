// after you loggin you have a token, we verify the token with this middleware
// function every time we want a page to be authentificated
// https://www.youtube.com/watch?v=2jqok-WgelI&t=3386s at 1h03m
// testable with postman

const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUserVerif(req) {
  try {
    if (!req.jwt) return false;
    const verified = await jwt.verify(req.jwt, process.env.TOKEN_SECRET);
    const result = await session
      .run(`MATCH (u:User {login: {userSource}, uuid:{uuid}}) RETURN u`, {
        userSource: req.userSource,
        uuid: verified.uuid
      })
      .catch(err => {
        console.log("err on modelUserVerif, find user: ", err);
      });

    return result.records.length > 0 ? true : false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  modelUserVerif
};
