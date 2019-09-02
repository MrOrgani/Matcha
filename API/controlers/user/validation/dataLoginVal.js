module.exports = function dataLoginVal(req, res, next) {
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
