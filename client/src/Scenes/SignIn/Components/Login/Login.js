import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
// import { DisplayFormikState } from './formikHelper';

const styles = {};

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;

function Login(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false);
    setOpen(true);
  }

  const initialState = {
    // flogin: "",
    // llogin: "",
    login: "",
    email: "",
    password: ""
  };

  const userSchema = yup.object().shape({
    login: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .matches(
        /[a-z]+[A-Z]+[0-9]+[@#$&]*/,
        "Password must contain at least one capital and one non-capital letter, one chiffre"
      )
      .max(13)
      .min(8)
  });

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Contact us!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="form-dialog-title"
      >
        {!isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Reister</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please complete the form to meet new people
              </DialogContentText>
              <Formik
                initialValues={initialState}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post(contactFormEndpoint, values, {
                      headers: {
                        // "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                      }
                    })
                    .then(res => {
                      console.log(res.data);
                    })
                    .then(res => {
                      setSubmitionCompleted(true);
                    });
                }}
                validationSchema={userSchema}
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
                        className={classes.textField}
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
                        className={classes.textField}
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
                        className={classes.textField}
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
        {isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
            <DialogContent>
              <DialogContentText>Thanks</DialogContentText>
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

export default withStyles(styles)(Login);
