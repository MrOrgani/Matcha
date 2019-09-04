import React, {
  // useState,
  useContext
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
import { LoginValidation } from "../UserValidation";
// import { AuthContext } from "../../../../../../AuthContext";
// import { AuthContext } from "../../../../AuthContext";
// import { socket } from "../../../../Components/Navbar/NavBar";
import "../../../../../NavBar.css";
import { ConnectButtonContext } from "../../ConnectButtonContext";

export default function FormLogin() {
  const [state, setState] = useContext(ConnectButtonContext);
  // const [socketContext, authContext] = useContext(AuthContext);

  return (
    <React.Fragment>
      <DialogContent>
        <Formik
          initialValues={state}
          onSubmit={async (values, { state }) => {
            setState({ ...state, submitting: true });
            const resLogin = await axios
              .post("http://localhost:9000/api/user/login", values, {
                headers: {
                  "Content-Type": "application/json"
                }
              })
              // .then(res => {
              //   // console.log("response de l'API", res.data);
              //   if (res.status === 200) {
              //     setState({ ...state, isSubmitionCompleted: true });
              //     socketContext.socket && socketContext.socket.emit("logOut");
              //     // sessionStorage.data = JSON.stringify(res.data);
              //     console.log(res.data);
              //     authContext.setData(res.data);
              //     authContext.setIsAuth(1);
              //     // sessionStorage.isAuth = 1;
              //     // socketContext.socket.emit("login", res.data.login);
              //   } else {
              //     let errorStr = "";
              //     setState({
              //       ...state,
              //       isSubmitionCompleted: true,
              //       isValid: false
              //     });
              //     if (typeof res.data !== "string") {
              //       for (let strKey in res.data) {
              //         errorStr += res.data[strKey] + "\n";
              //       }
              //     } else {
              //       errorStr = res.data;
              //     }
              //     setState({ ...state, textError: errorStr.trim() });
              //   }
              // })
              .catch(err =>
                console.log("Error while loging: ", err.response.data)
              );

            if (resLogin.status === 200)
              setState({ ...state, isSubmitionCompleted: true, isValid: true });

            console.log("FormLogin resLogin", resLogin);
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
      </DialogContent>
    </React.Fragment>
  );
}
