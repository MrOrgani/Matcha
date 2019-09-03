const bcrypt = require("bcryptjs");
// Crypts pwd and returns a well rounded user object from req.body
module.exports = async function cryptNObject(req, res, next) {
  try {
    console.log("crypt");
    const salt = await bcrypt.genSalt(10);
    const password = req.body.password
      ? req.body.password
      : req.body.values.newpassword;
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password
      ? (req.body.password = hashPassword)
      : (req.body.values.newpassword = hashPassword);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
