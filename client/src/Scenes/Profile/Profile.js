import React, { useState } from "react";
import Photos from "./Components/Photos";
import { Formik } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";

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

export default function Profile() {
  const classes = useStyles();
  const data = JSON.parse(sessionStorage.getItem("data"));
  const [values, setValues] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    login: data.login,
    age: data.age,
    sexualOrientation: data.sexualPref,
    bio: data.bio
  });
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  // console.log(data);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };
  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <Grid item xs={6}> */}
      <div className={classes.gallery}>
        <Photos photos={data.pics} />
      </div>
      <Grid
        item
        xs={6}
        //   sm={8} md={5}
        component={Paper}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Formik
            initialValues={values}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log("values", values);
              axios
                .post("http://localhost:9000/api/user/", values, {
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                .then(res => {
                  console.log("response de l'API", res);
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
              // console.log(errors.login, touched.login);
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
                      <OutlinedInput
                        name="gender"
                        // labelWidth={labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    <option value="" />
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    {/* <option value={"apache"}>Apache Helicopter</option> */}
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
                    autoFocus
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
                        // labelWidth={labelWidth}
                        id="outlined-age-native-simple"
                      />
                    }
                  >
                    {/* <option value="" /> */}
                    <option value={"bi"}>Bi</option>
                    <option value={"straight"}>Straight</option>
                    <option value={"gay"}>Gay</option>
                  </Select>
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Change my information
                  </Button>
                  {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>{/* <MadeWithLove /> </Box> */}
                </form>
              );
            }}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}
