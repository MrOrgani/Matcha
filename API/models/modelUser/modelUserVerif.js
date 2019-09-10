// after you loggin you have a token, we verify the token with this middleware
// function every time we want a page to be authentificated
// https://www.youtube.com/watch?v=2jqok-WgelI&t=3386s at 1h03m
// testable with postman

const { initNeo4j } = require("../initNeo4j");
const session = initNeo4j();
const jwt = require("jsonwebtoken");

async function modelUserVerif(req) {
  try {
    // if (req.type == "notifDelete") console.log("req mdoelUserVerif", req);
    if (req.uuidSource) req.uuid = req.uuidSource;
    if (!req.jwt) return false;
    const verified = await jwt.verify(req.jwt, process.env.TOKEN_SECRET);
    // const result = await session.run(
    //   `MATCH (u:User {login: {uuidSource}, uuid:{uuid}}) RETURN u`,
    //   {
    //     uuidSource: req.uuidSource,
    //     uuid: verified.uuid
    //   }
    // );
    // console.log("result ModelUserVerif", req.uuidSource === verified.uuid);
    // return result.records.length > 0 ? true : false;
    return req.uuid === verified.uuid;
  } catch (err) {
    console.log("err on modelUserVerif, find user: ", err, req);
  }
}

module.exports = {
  modelUserVerif
};
