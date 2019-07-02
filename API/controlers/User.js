// import yup from "yup";
const ModelUser = require("../models/User");
// const { userSchema } = require("./Schemas");
// import * as yup from "yup";
const yup = require("yup");

const userSchema = yup.object().shape({
  login: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .matches(/[a-z]+/, "Password must contain at least one non-capital letter.")
    .matches(/[A-Z]+/, "Password must contain at least one capital letter.")
    .matches(/[0-9]+/, "Password must contain at least one digit.")
    .matches(
      /[!@#$%^&*()]+/,
      "Password must contain at least one special character among : !@#$%^&*()."
    )
    .max(13)
    .min(4)
});

async function createUser(req, res) {
  reqData = {
    login: req.body.login,
    password: req.body.password,
    email: req.body.email
  };

  userSchema.isValid(reqData).then(ModelUser.createUser(reqData, res));
  //check if email already exists
  // const emailExist = await User.findOne({ email: req.body.email });
  // if (emailExist) return res.status(400).send("Email already exists");
}

module.exports = {
  createUser
};
