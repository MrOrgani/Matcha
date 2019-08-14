import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import { LoginValidation } from "../UserValidation";
import { AuthContext } from "../../../../AuthContext";
// import { AuthContext } from "../../../../AuthContext";
// import { socket } from "../../../../Components/Navbar/NavBar";

function Login() {
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");
  const [socketContext, authContext] = useContext(AuthContext);

  function handleClose() {
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
    password: ""
  };

  // console.log("socketContext = ", socketContext);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <div style={{ color: "white" }}>Login</div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
                        "Content-Type": "application/json"
                      }
                    })
                    .then(res => {
                      // console.log("response de l'API", res.data);
                      if (res.status === 200) {
                        setSubmitionCompleted(true);
                        socketContext.socket &&
                          socketContext.socket.emit("logOut");
                        // sessionStorage.data = JSON.stringify(res.data);
                        console.log(res.data);
                        authContext.setData(res.data);
                        authContext.setIsAuth(1);
                        // sessionStorage.isAuth = 1;
                        // socketContext.socket.emit("login", res.data.login);
                      } else {
                        console.log(res);
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
                validate={LoginValidation}
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

export default Login;
