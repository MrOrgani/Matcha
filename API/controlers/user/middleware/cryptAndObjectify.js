const bcrypt = require("bcryptjs");
// Crypts pwd and returns a well rounded user object from req.body
module.exports = async function cryptNObject(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    if (
      req.body.values &&
      req.body.values.newpassword &&
      req.body.values.oldpassword
    ) {
      password = req.body.values.newpassword;
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.values.newpassword = hashPassword;
      delete req.body.values.oldpassword;
      console.log("cryptandObjectify NEWPASS AND CONFNEW EXIST");
    }
    // console.log("crypt wht are in req", req.body);
    if (req.body.password) {
      password = req.body.password;
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
      if (req.body.confNewPass) delete req.body.confNewPass;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
