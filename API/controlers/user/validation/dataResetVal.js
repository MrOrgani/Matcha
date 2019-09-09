module.exports = function dataResetValidation(req, res, next) {
  // console.log("dataReset");
  let errors = {};
  if (!req.body.password) {
    errors.password = "Password is Required";
  } else if (
    !/(?=.*[0-9])(?=.*[a-zA-Z])([a-z!A-Z0-9!@#$%^&*()]+)/.test(
      req.body.password
    )
  ) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(req.body.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  } else if (req.body.password < 6 || req.body.password > 20) {
    errors.password = "Your password must contain between 6 and 20 characters";
  }
  if (!req.body.confNewPass) {
    errors.confNewPass = "Required";
  } else if (req.body.password !== req.body.confNewPass)
    errors.confNewPass = "Passwords must match !";
  for (let x in errors) return res.status(203).send(errors);
  next();
};
