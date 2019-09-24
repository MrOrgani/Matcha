const jwt = require("jsonwebtoken");

module.exports = function cleanUserData(userData) {
  const token = jwt.sign({ uuid: userData.uuid }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  userData.jwt = token;
  delete userData.password;
  return userData;
};
