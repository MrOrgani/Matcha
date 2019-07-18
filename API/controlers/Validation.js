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

exports.ProfileValidation = function(values) {
  let errors = {};
  if (values.firstName && !/^[a-z]+/i.test(values.firstName)) {
    errors.firstName = "Your First Name must contain letters only";
  }
  if (values.lastName && !/^[a-z]+/i.test(values.lastName)) {
    errors.lastName = "Your last Name must contain letters only";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address !";
  }
  if (values.login && !/^[a-z0-9]+/i.test(values.login)) {
    errors.login = "Your Login can only contain letters and numbers";
  }
  return errors;
};
