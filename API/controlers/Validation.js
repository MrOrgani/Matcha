const { findOne } = require("./../models/modelUser");
const bcrypt = require("bcryptjs");

exports.dataRegisterValidation = function(req, res, next) {
  let errors = {};
  if (!req.body.login) {
    errors.login = "A login is required";
  }
  if (!req.body.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.email)
  ) {
    errors.email = "Invalid email address !";
  }
  if (!req.body.password) {
    errors.password = "Password is Required";
  } else if (!/[A-Z0-9]+/i.test(req.body.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(req.body.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  for (let x in errors) return res.status(400).send(errors);
  next();
};

exports.dataLoginValidation = function(req, res, next) {
  // console.log("login", req.body);
  const errors = {};
  if (!req.body.login) {
    errors.login = "A login is required";
  }
  if (!req.body.password) {
    errors.password = "Password is required";
  } else if (!/[A-Z0-9]+/i.test(req.body.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^*&()]+/.test(req.body.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  for (let x in errors) return res.status(400).send(errors);
  next();
};

exports.dataProfileValidation = function(req, res, next) {
  let errors = {};
  for (let value in req.body.values) {
    if (
      !req.body.values[value] &&
      value !== "oldpassword" &&
      value !== "newpassword"
    )
      errors[value] = `${value} is required`;
  }
  if (
    req.body.values.firstName &&
    !/^[a-z]+$/i.test(req.body.values.firstName)
  ) {
    errors.firstName = "Your First Name must contain letters only";
  }
  if (req.body.values.lastName && !/^[a-z]+$/i.test(req.body.values.lastName)) {
    errors.lastName = "Your last Name must contain letters only";
  }
  if (
    req.body.values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.values.email)
  ) {
    errors.email = "Invalid email address !";
  }
  if (req.body.values.login && !/^[a-z0-9]+$/i.test(req.body.values.login)) {
    errors.login = "Your Login can only contain letters and numbers";
  }
  // console.log("error ara", errors);
  for (let x in errors) return res.status(400).send(errors);
  next();
};

exports.checkPasswordIsChanged = async function(req, res, next) {
  let errors = {};
  const { oldpassword, newpassword } = req.body.values;
  // Si oldpassword et newpassword
  if (oldpassword && newpassword) {
    try {
      const userData = await findOne(req.query.login, "login");
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
