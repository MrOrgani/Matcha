const jwt = require("jsonwebtoken");

module.exports = function cleanUserData(userData) {
  console.log("in cleanUserData", userData);
  const token = jwt.sign(
    { uuid: userData.uuid, login: userData.login },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    }
  );
  userData.jwt = token;
  // delete userData.uuid;// need it for the chat rooms
  delete userData.password;
  console.log("gere", userData);
  return userData;
};
