import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import { RegisterValidation } from "../UserValidation";
// import { DisplayFormikState } from './formikHelper';

function Register() {
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");

  function handleClose() {
    // console.log("handleclose", isValid, textError);
    setValid(true);
    setTextError("");
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  const initialState = {
    login: "",
    email: "",
    password: ""
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <div style={{ color: "white" }}>Create an Account</div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please complete the form to meet new people
              </DialogContentText>
              <Formik
                initialValues={initialState}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post("http://localhost:9000/api/user/register", values, {
                      headers: {
                        // "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                      }
                    })
                    .then(res => {
                      // console.log("response de l'API", res);
                      if (res.status === 200) setSubmitionCompleted(true);
                      else {
                        console.log("erreure recue lors de l'enregistrement");
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
                validate={RegisterValidation}
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

                      <TextField
                        error={errors.email && touched.email}
                        label="email"
                        name="email"
                        // className={classes.textField}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.email && touched.email && errors.email
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
            <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your registration is almost complete! <br />
                You received a confirmation email
              </DialogContentText>
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

export default Register;
