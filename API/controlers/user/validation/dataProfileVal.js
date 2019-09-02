module.exports = function dataProfileVal(req, res, next) {
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
