module.exports = function dataLoginVal(req, res, next) {
  const errors = {};
  if (!req.body.login) {
    errors.login = "A login is required";
  }
  if (!req.body.password) {
    errors.password = "Password is required";
  }
  for (let x in errors) return res.status(203).send(errors);
  next();
};
