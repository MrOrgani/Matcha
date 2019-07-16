const jwt = require("jsonwebtoken");

// after you loggin you have a token, we verify the token with this middleware
// function every time we want a page to be authentificated
// https://www.youtube.com/watch?v=2jqok-WgelI&t=3386s at 1h03m
// testable with postman

module.exports = function(req, res, next) {
  // console.log(req.header("auth-token"));
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send("auth (JWT) access denied, you don't even have token lul");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};
