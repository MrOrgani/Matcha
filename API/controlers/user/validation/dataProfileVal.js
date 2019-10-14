const modelFindOne = require("../../../models/modelUser/modelFindOne");

module.exports = async function dataProfileVal(req, res, next) {
  let errors = {};

  const userData = await modelFindOne(req.body.values.uuid, "uuid");

  if (!req.body.values.age) {
    errors.age = "Age is required";
  } else if (req.body.values.age < 18 && req.body.values.age > 100) {
    errors.age = "You must be between 18 and 100";
  }

  if (!req.body.values.bio) {
    errors.bio = "A bio is required";
  } else if (!/^[A-Z ,.!?0-9\t\r\n]+$/i.test(req.body.values.bio))
    errors.bio = "Your bio can only contain letters and numbers";
  else if (req.body.values.bio.length < 5 || req.body.values.bio.length > 100)
    errors.bio = "Your bio must length between 5 and 100 chars";

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
  } else if (!/^[A-Z -]+$/i.test(req.body.values.firstName))
    errors.firstName = "Firstname must only contain letters";
  else if (
    req.body.values.firstName.length < 2 ||
    req.body.values.firstName.length > 30
  )
    errors.firstName = "Your first name must length between 2 and 30 chars";
  if (!req.body.values.gender) {
    errors.gender = "Gender is required";
  }

  if (!req.body.values.hobbies || req.body.values.hobbies.length < 5) {
    errors.hobbies = "You must select at least 5 hobbies";
  }

  if (!req.body.values.lastName) {
    errors.lastName = "A lastname is required";
  } else if (!/^[A-Z -]+$/i.test(req.body.values.lastName))
    errors.lastName = "Lastname must only contain letters";
  else if (
    req.body.values.lastName.length < 2 ||
    req.body.values.lastName.length > 30
  )
    errors.lastName = "Your last name must length between 2 and 30 chars";
  if (!req.body.values.login) {
    errors.login = "A login is required";
  } else if (!/^[A-Z0-9 _-]+$/i.test(req.body.values.login)) {
    errors.login = "login can only contain letters and Numbers";
  } else if (userData.login !== req.body.values.login) {
    const logTaken = await modelFindOne(req.body.values.login, "login");
    if (logTaken.login) errors.login = "This login is already taken.";
  }

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

  if (!req.body.values.pics || req.body.values.pics.length < 1) {
    errors.pics = "You must upload at least 1 pic";
  }

  if (!req.body.values.lookingFor) {
    errors.lookingFor = "What are you looking for ?";
  }

  for (let x in errors) return res.status(201).send(errors);
  next();
};
