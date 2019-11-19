module.exports = function dataRegisterValidation(req, res, next) {
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
  } else if (!/[A-Z]+/.test(req.body.password)) {
    errors.password = "Password must at least contain one capital letter";
  } else if (!/[!@#$%^&*()]+/.test(req.body.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  } else if (req.body.password.length < 6) {
    errors.password = "Password must contain at least 6 chars";
  }
  for (let x in errors) return res.status(400).send(errors);
  next();
};
