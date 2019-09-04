import React, {
  useState
  //  useContext
} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import { RegisterValidation } from "./UserValidation";
// import { AuthContext } from "../../../../../../AuthContext";
import "../../../../NavBar.css";
import { Result } from "antd";

function Register() {
  // const [socketContext, authContext] = useContext(AuthContext);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  const [isValid, setValid] = useState(true);
  const [textError, setTextError] = useState("");

  const initialState = {
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    password: ""
  };

  return (
    <React.Fragment>
      <DialogContent>
        {!isSubmitionCompleted ? (
          <Formik
            initialValues={initialState}
            onSubmit={(values, { setSubmitting }) => {
              console.log("values", values);
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
                    // console.log("erreure recue lors de l'enregistrement");
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
                  console.log("Error while registering: ", err.response.data)
                );
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
                <form onSubmit={handleSubmit} className="registerBlock">
                  <TextField
                    label="firstname"
                    name="firstName"
                    // className={textField}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.firstName && touched.firstName && errors.firstName
                    }
                    margin="normal"
                  />
                  <TextField
                    label="lastname"
                    name="lastName"
                    // className={textField}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.lastName && touched.lastName && errors.lastName
                    }
                    margin="normal"
                  />
                  <TextField
                    label="login"
                    name="login"
                    // className={textField}
                    value={values.login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.login && touched.login && errors.login}
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
                    helperText={errors.email && touched.email && errors.email}
                    margin="normal"
                  />
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
        ) : (
          <Result
            status={isValid ? "success" : "error"}
            title={isValid ? "Signed up !" : "Error."}
            subTitle={
              isValid
                ? "An email to confirm your account has been sent :)"
                : textError
            }
          />
        )}
      </DialogContent>
    </React.Fragment>
  );
}

export default Register;
