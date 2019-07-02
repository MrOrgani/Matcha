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

module.exports = {
  userSchema
};
