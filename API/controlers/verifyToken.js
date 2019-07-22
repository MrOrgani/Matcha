const jwt = require("jsonwebtoken");

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
