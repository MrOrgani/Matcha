import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    height: "auto"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  gallery: {
    display: "inline",
    width: "50%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function FormProfile(props) {
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");
  const data = JSON.parse(sessionStorage.getItem("data"));
  const [values, setValues] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    login: data.login,
    age: data.age,
    sexualOrientation: data.sexualOrientation,
    bio: data.bio,
    pics: data.pics
  });

  const classes = useStyles();
  return (
    <Formik
      initialValues={values}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        values.loginRef = JSON.parse(sessionStorage.getItem("data")).login;
        // values.pics = {data.pics}
        console.log("values are", values);
        axios.post("http://localhost:9000/api/user/", values).then(res => {
          console.log("response de l'API", res);
          sessionStorage.setItem("data", res.config.data);
          if (res.status === 200) {
            setSubmitionCompleted(true);
          } else {
            let errorStr = "";
            setSubmitionCompleted(true);
            setValid(false);
            if (typeof res.data !== "string") {
              for (let strKey in res.data) {
                errorStr += res.data[strKey] + "\n";
              }
            } else {
              errorStr = res.data;
            }
            setTextError(errorStr.trim());
          }
        });
      }}
      // validate={UserValidation}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="outlined-name"
              label="First Name"
              className={classes.textField}
              value={values.firstName}
              onChange={handleChange("firstName")}
              margin="normal"
              variant="outlined"
              name="firstName"
            />
            <TextField
              id="outlined-name"
              label="Last Name"
              className={classes.textField}
              value={values.lastName}
              onChange={handleChange("lastName")}
              margin="normal"
              variant="outlined"
              name="lastName"
            />
            <Select
              native
              className={classes.textField}
              value={values.gender}
              onChange={handleChange("gender")}
              input={
                <OutlinedInput name="gender" id="outlined-age-native-simple" />
              }
            >
              <option value="" />
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </Select>
            <TextField
              id="outlined-name"
              label="Login"
              className={classes.textField}
              value={values.login}
              onChange={handleChange("login")}
              margin="normal"
              variant="outlined"
              name="login"
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={values.email}
              onChange={handleChange("email")}
            />

            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows="4"
              fullWidth
              id="bio"
              label="Biography"
              name="bio"
              autoComplete="email"
              // autoFocus
              value={values.bio}
              onChange={handleChange("bio")}
            />

            <Typography component="h1">Sexual Orientation</Typography>
            <Select
              native
              className={classes.textField}
              value={values.sexualOrientation}
              onChange={handleChange("sexualOrientation")}
              input={
                <OutlinedInput
                  name="sexualOrientation"
                  id="outlined-age-native-simple"
                />
              }
            >
              <option value="" />
              <option value={"bi"}>Bi</option>
              <option value={"straight"}>Straight</option>
              <option value={"gay"}>Gay</option>
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change my information
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
