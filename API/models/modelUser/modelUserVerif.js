// after you loggin you have a token, we verify the token with this middleware
// function every time we want a page to be authentificated
// https://www.youtube.com/watch?v=2jqok-WgelI&t=3386s at 1h03m
// testable with postman

const jwt = require("jsonwebtoken");

async function modelUserVerif(req) {
  try {
    if (req.uuidSource) req.uuid = req.uuidSource;
    if (!req.jwt) return false;
    const verified = await jwt.verify(req.jwt, process.env.TOKEN_SECRET);
    return req.uuid === verified.uuid;
  } catch (err) {
    console.log("err on modelUserVerif, find user: ", err, req);
  }
}

module.exports = {
  modelUserVerif
};
