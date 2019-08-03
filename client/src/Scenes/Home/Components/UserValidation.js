export const RegisterValidation = function(values) {
  // console.log(values);
  let errors = {};
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

export const valuesValidations = values => {
  // console.log("FUCKING VALUES ARE", values);
  let errors = {};
  if (!values.age) {
    errors.age = "Age is required";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  // if (!values.email) {
  //   errors.email = "Required";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = "Invalid email address !";
  // }
  // if (!values.password) {
  //   errors.password = "Required";
  // } else if (!/[A-Z0-9]+/i.test(values.password)) {
  //   errors.password = "Password must at least contain one letter and one digit";
  // } else if (!/[!@#$%^&*()]+/.test(values.password)) {
  //   errors.password =
  //     "Password must at least contain one of the following !@#$%^&*()";
  // }
  console.log("fuking errors", errors);
  return errors;
};

// export default { RegisterValidation, LoginValidation };
