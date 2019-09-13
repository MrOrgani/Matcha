module.exports = function dataProfileVal(req, res, next) {
  let errors = {};
  // console.log("in dataProfileVal");
  // for (let value in req.body.values) {
  //   if (
  //     !req.body.values[value] &&
  //     value !== "oldpassword" &&
  //     value !== "newpassword"
  //   )
  //     errors[value] = `${value} is required`;
  // }
  // if (
  //   req.body.values.firstName &&
  //   !/^[a-z]+$/i.test(req.body.values.firstName)
  // ) {
  //   errors.firstName = "Your First Name must contain letters only";
  // }
  // if (req.body.values.lastName && !/^[a-z]+$/i.test(req.body.values.lastName)) {
  //   errors.lastName = "Your last Name must contain letters only";
  // }
  // if (
  //   req.body.values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.values.email)
  // ) {
  //   errors.email = "Invalid email address !";
  // }
  // if (req.body.values.login && !/^[a-z0-9]+$/i.test(req.body.values.login)) {
  //   errors.login = "Your Login can only contain letters and numbers";
  // }
  // console.log("error ara", errors);

  if (!req.body.values.age) {
    errors.age = "Age is required";
  }

  if (!req.body.values.bio) {
    errors.bio = "A bio is required";
  } else if (!/^[A-Z ,.!?0-9]+$/i.test(req.body.values.bio))
    errors.firstName = "Your bio can only contain letters and numbers";
  if (!req.body.values.gender) {
    errors.gender = "Gender is required";
  }

  //city

  if (!req.body.values.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.values.email)
  ) {
    errors.email = "Invalid email address !";
  }

  if (!req.body.values.firstName) {
    errors.firstName = "A firstname is required";
  } else if (!/^[A-Z]+$/i.test(req.body.values.firstName))
    errors.firstName = "Firstname must only contain letters";

  if (!req.body.values.gender) {
    errors.gender = "Gender is required";
  }

  if (!req.body.values.hobbies || req.body.values.hobbies.length < 5) {
    errors.hobbies = "You must select at least 5 hobbies";
  }

  if (!req.body.values.lastName) {
    errors.lastName = "A lastname is required";
  } else if (!/^[A-Z]+$/i.test(req.body.values.lastName))
    errors.lastName = "Lastname must only contain letters";

  if (!req.body.values.login) {
    errors.login = "A login is required";
  } else if (!/^[A-Z]+$/i.test(req.body.values.login))
    errors.login = "Login must only contain letters";

  if (req.body.values.newpassword && req.body.values.oldpassword) {
    if (
      !/(?=.*[0-9])(?=.*[a-zA-Z])([a-z!A-Z0-9!@#$%^&*()]+)/.test(
        req.body.values.newpassword
      )
    ) {
      errors.newpassword =
        "Your newpassword must at least contain one letter and one digit";
    } else if (!/[!@#$%^&*()]+/.test(req.body.values.newpassword)) {
      errors.newpassword =
        "Your newpassword must at least contain one of the following !@#$%^&*()";
    } else if (
      req.body.values.newpassword.length < 6 ||
      req.body.values.newpassword.length > 20
    ) {
      errors.newpassword =
        "Your newpassword must contain between 6 and 20 characters";
    }
  }

  // if (!req.body.values.pics || req.body.values.pics.length < 1) {
  //   errors.pics = "You must upload at least 1 pic";
  // }

  if (!req.body.values.sexualOrientation) {
    errors.sexualOrientation = "Your sexual orientation is required";
  }

  // console.log("dataProfileVal no error", errors);
  for (let x in errors) return res.status(201).send(errors);
  next();
};
