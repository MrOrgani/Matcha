import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import { Formik } from "formik";
import { LoginValidation } from "./UserValidation";
import { AuthContext } from "../../../../../../AuthContext";
import "../../../../NavBar.css";
import { Result } from "antd";

function Login() {
  const [socketContext, authContext] = useContext(AuthContext);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");

  const initialState = {
    login: "",
    password: ""
  };

  return (
    <React.Fragment>
      <DialogContent>
        {!isSubmitionCompleted ? (
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
                  if (res.status === 200) {
                    setSubmitionCompleted(true);
                    socketContext.socket && socketContext.socket.emit("logOut");
                    // console.log(res.data);
                    authContext.setData(res.data);
                    authContext.setIsAuth(1);
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
                })
                .catch(err =>
                  console.log("Error while loging: ", err.response.data)
                );
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
              return (
                <form onSubmit={handleSubmit} className="registerBlock">
                  <TextField
                    label="login"
                    name="login"
                    value={values.login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.login && touched.login && errors.login}
                    margin="normal"
                  />
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
        ) : (
          <Result
            status={isValid ? "success" : "error"}
            title={isValid ? "Logged in !" : "Error."}
            subTitle={isValid ? "Enjoy :)" : textError}
          />
        )}
      </DialogContent>
    </React.Fragment>
  );
}

export default Login;
