import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { Formik } from "formik";
import { LoginValidation } from "../UserValidation";
import { AuthContext } from "../../../../../../../../src/AuthContext";
// import { AuthContext } from "../../../../AuthContext";
// import { socket } from "../../../../Components/Navbar/NavBar";
import "../../../../../NavBar.css";
import { ConnectButtonContext } from "../../ConnectButtonContext";
import { Spin, Icon } from "antd";
import {
  Result
  //  Button
} from "antd";

export default function FormLogin(props) {
  // const [state, setState] = useContext(ConnectButtonContext);
  // const [state, setState] = props.value;
  const [socketContext, authContext] = useContext(AuthContext);
  // const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;
  // console.log("state Form", state);

  const [open, setOpen] = useState(false);
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
            // onSubmit={async values => {
            //   console.log("FormLogin state onsub", state);
            //   setState({ ...state, submitting: true });
            //   const resLogin = await axios
            //     .post("http://localhost:9000/api/user/login", values, {
            //       headers: {
            //         "Content-Type": "application/json"
            //       }
            //     })
            //     // .then(res => {
            //     //   // console.log("response de l'API", res.data);
            //     //   if (res.status === 200) {
            //     //     setState({ ...state, isSubmitionCompleted: true });
            //     //     socketContext.socket && socketContext.socket.emit("logOut");
            //     //     // sessionStorage.data = JSON.stringify(res.data);
            //     //     console.log(res.data);
            //     //     authContext.setData(res.data);
            //     //     authContext.setIsAuth(1);
            //     //     // sessionStorage.isAuth = 1;
            //     //     // socketContext.socket.emit("login", res.data.login);
            //     //   } else {
            //     //     let errorStr = "";
            //     //     setState({
            //     //       ...state,
            //     //       isSubmitionCompleted: true,
            //     //       isValid: false
            //     //     });
            //     //     if (typeof res.data !== "string") {
            //     //       for (let strKey in res.data) {
            //     //         errorStr += res.data[strKey] + "\n";
            //     //       }
            //     //     } else {
            //     //       errorStr = res.data;
            //     //     }
            //     //     setState({ ...state, textError: errorStr.trim() });
            //     //   }
            //     // })
            //     .catch(err =>
            //       console.log("Error while loging: ", err.response.data)
            //     );
            //   // console.log("FormLogin resLogin", resLogin);

            //   if (resLogin.status === 200) {
            //     setState({
            //       ...state,
            //       isSubmitionCompleted: true,
            //       isValid: true
            //     });
            //     socketContext.socket && socketContext.socket.emit("logOut");
            //     authContext.setData(resLogin.data);
            //     authContext.setIsAuth(1);
            //   } else {
            //     let errorStr = "";
            //     setState({
            //       ...state,
            //       isSubmitionCompleted: true,
            //       isValid: false
            //     });
            //     if (typeof resLogin.data !== "string") {
            //       for (let strKey in resLogin.data) {
            //         errorStr += resLogin.data[strKey] + "\n";
            //       }
            //     } else {
            //       errorStr = resLogin.data;
            //     }
            //     setState({ ...state, textError: errorStr.trim() });
            //   }
            // }}
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
                    socketContext.socket && socketContext.socket.emit("logOut");
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
              // console.log(errors.login, touched.login);
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
            // extra={
            //   <Button type="primary" key="login">
            //     <a href="/">Home</a>
            //   </Button>
            // }
          />
        )}
      </DialogContent>
    </React.Fragment>
  );
}
