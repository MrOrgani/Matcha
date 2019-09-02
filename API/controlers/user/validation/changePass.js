const modelFindOne = require("../../../models/modelUser/modelFindOne");
const bcrypt = require("bcryptjs");

module.exports = async function changePass(req, res, next) {
  let errors = {};
  const { oldpassword, newpassword } = req.body.values;
  // Si oldpassword et newpassword
  if (oldpassword && newpassword) {
    try {
      const userData = await modelFindOne(req.query.login, "login");
      const { password } = userData[0]._fields[0].properties;
      if (!(await bcrypt.compare(oldpassword, password))) {
        errors.oldpassword = "You old password is incorrect !";
        console.log("pas bon le pass");
        return;
      } else if (!/[A-Z0-9]+/i.test(newpassword)) {
        errors.newpassword =
          "You new Password must at least contain one letter and one digit";
      } else if (!/[!@#$%^&*()]+/.test(newpassword)) {
        errors.newpassword =
          "Your new Password must at least contain one of the following !@#$%^&*()";
      }
      delete req.body.values.oldpassword;
      console.log("req.body.values.oldpasswird", req.body.values.oldpassword);
    } catch (err) {
      console.log(err);
    }
    for (let x in errors) return res.status(400).send(errors);
  }
  next();
};
