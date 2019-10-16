const modelFindOne = require("../../../models/modelUser/modelFindOne");
const bcrypt = require("bcryptjs");

module.exports = async function changePass(req, res, next) {
  let errors = {};
  const { oldpassword, newpassword } = req.body.values;
  if (oldpassword && newpassword) {
    try {
      const userData = await modelFindOne(req.query.uuidSource, "uuid");
      const { password } = userData;
      if (!(await bcrypt.compare(oldpassword, password))) {
        errors.oldpassword = "You old password is incorrect !";
      } else if (!/[A-Z0-9]+/i.test(newpassword)) {
        errors.newpassword =
          "You new Password must at least contain one letter and one digit";
      } else if (!/[!@#$%^&*()]+/.test(newpassword)) {
        errors.newpassword =
          "Your new Password must at least contain one of the following !@#$%^&*()";
      }
    } catch (err) {
      console.log(err, req.body.values);
    }
    for (let x in errors) return res.status(201).json(errors);
  }
  next();
};
