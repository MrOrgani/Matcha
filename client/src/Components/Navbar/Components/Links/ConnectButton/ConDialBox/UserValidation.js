export const RegisterValidation = function(values) {
  // console.log(values);
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "A firstname is required";
  } else if (!/^[A-Z]+$/i.test(values.firstName))
    errors.firstName = "Firstname must only contain letters";
  if (!values.lastName) {
    errors.lastName = "A lastname is required";
  } else if (!/^[A-Z]+$/i.test(values.lastName))
    errors.lastName = "Lastname must only contain letters";
  if (!values.login) {
    errors.login = "A login is required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address !";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (!/[A-Z0-9]+/i.test(values.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(values.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  return errors;
};

export const LoginValidation = function(values) {
  let errors = {};
  if (!values.login) {
    errors.login = "A login is required";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (!/[A-Z0-9]+/i.test(values.password)) {
    errors.password = "Password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(values.password)) {
    errors.password =
      "Password must at least contain one of the following !@#$%^&*()";
  }
  return errors;
};

export const ForgotValidation = function(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address !";
  }
  return errors;
};

export const ResetValidation = function(values) {
  let errors = {};
  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/(?=.*[0-9])(?=.*[a-zA-Z])([a-z!A-Z0-9!@#$%^&*()]+)/.test(values.password)
  ) {
    errors.password =
      "Your password must at least contain one letter and one digit";
  } else if (!/[!@#$%^&*()]+/.test(values.password)) {
    errors.password =
      "Your password must at least contain one of the following !@#$%^&*()";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Your password must contain between 6 and 20 characters";
  }
  if (!values.confNewPass) {
    errors.confNewPass = "Required";
  } else if (values.password !== values.confNewPass)
    errors.confNewPass = "Passwords must match !";
  return errors;
};

export const valuesValidations = values => {
  let errors = {};
  if (!values.age) {
    errors.age = "Age is required";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  console.log("fuking errors", errors);
  return errors;
};

// export default { RegisterValidation, LoginValidation };
