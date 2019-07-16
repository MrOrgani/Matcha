import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import UserValidation from "../UserValidation";
import { useCookies } from "react-cookie";
// import { DisplayFormikState } from './formikHelper';

const styles = {};
const useStyle = makeStyles({
  div: {
    color: "white"
  }
});
function Register() {
  // const { classes } = props;
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");
  const [cookies, setCookie] = useCookies(["auth"]);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  const initialState = {
    login: "",
    password: ""
  };

  const classes = useStyle();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <div className={classes.div}>Login</div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>Hello there,</DialogContentText>
              <Formik
                initialValues={initialState}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post("http://localhost:9000/api/user/login", values, {
                      headers: {
                        // "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                      }
                    })
                    .then(res => {
                      // console.log("response de l'API", res);
                      // CONNECTION SUCCESS
                      if (res.status === 200) {
                        setSubmitionCompleted(true);
                        setCookie("auth", res.data.uuid, {
                          // httpOnly: true,
                          // HERE SECURITY QUESTION, WITHOUT HTTPONLY, COOKIES ARE POTENTIALLY VULNERABLE (NOT IN CHROME)
                          path: "/"
                        });
                      } else {
                        // CONNECTION FAILURE
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
                validate={UserValidation}
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
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="login"
                        name="login"
                        // className={textField}
                        value={values.login}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.login && touched.login && errors.login
                        }
                        margin="normal"
                      />

                      <br />
                      <TextField
                        error={errors.password && touched.password}
                        label="password"
                        name="password"
                        // className={classes.textField}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                        margin="normal"
                      />

                      <DialogActions>
                        <Button
                          type="button"
                          className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                        {/* <DisplayFormikState {...props} /> */}
                      </DialogActions>
                    </form>
                  );
                }}
              </Formik>
            </DialogContent>
          </React.Fragment>
        )}
        {isSubmitionCompleted && isValid && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Logged In!</DialogTitle>
            <DialogContent>
              <DialogContentText>You successfully logged in</DialogContentText>
              <DialogActions>
                <Button type="button" className="outline" onClick={handleClose}>
                  Back to app
                </Button>
                {/* <DisplayFormikState {...props} /> */}
              </DialogActions>
            </DialogContent>
          </React.Fragment>
        )}
        {isSubmitionCompleted && !isValid && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Oupsy!</DialogTitle>
            <DialogContent>
              <DialogContentText>{textError}</DialogContentText>
              <DialogActions>
                <Button type="button" className="outline" onClick={handleClose}>
                  Back to app
                </Button>
                {/* <DisplayFormikState {...props} /> */}
              </DialogActions>
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default withStyles(styles)(Register);
