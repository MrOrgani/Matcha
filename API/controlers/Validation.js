exports.RegisterValidation = function(values) {
  let errors = {};
  if (!values.login) {
    errors.login = "A login is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address !";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (!/[A-Z0-9]+/i.test(values.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(values.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  return errors;
};

exports.LoginValidation = function(values) {
  const errors = {};
  if (!values.login) {
    errors.login = "A login is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!/[A-Z0-9]+/i.test(values.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^*&()]+/.test(values.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  return errors;
};
