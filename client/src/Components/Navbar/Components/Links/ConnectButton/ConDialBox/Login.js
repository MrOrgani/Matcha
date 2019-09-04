import React, {
  // useState,
  useContext
} from "react";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import axios from "axios";
// import { Formik } from "formik";
// import { LoginValidation } from "./UserValidation";
// import { AuthContext } from "../../../../../AuthContext";
// import { AuthContext } from "../../../../AuthContext";
// import { socket } from "../../../../Components/Navbar/NavBar";
import "../../../../NavBar.css";
import { ConnectButtonContext } from "../ConnectButtonContext";
import { Result, Button } from "antd";

import FormLogin from "./Components/FormLogin";

function Login() {
  // const [open, setOpen] = useState(false);
  // // const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  // // const [isValid, setValid] = useState(true);
  // // const [textError, setTextError] = useState("");
  // const [socketContext, authContext] = useContext(AuthContext);
  const [
    state
    // setState
  ] = useContext(ConnectButtonContext);

  // function handleClose() {
  //   setValid(true);
  //   setTextError("");
  //   setOpen(false);
  // }

  // function handleClickOpen() {
  //   setSubmitionCompleted(false);
  //   setOpen(true);
  // }

  // const initialState = {
  //   login: "",
  //   password: ""
  // };

  // console.log("socketContext = ", socketContext);

  return (
    <React.Fragment>
      {!state.isSubmitionCompleted && <FormLogin />}
      {state.isSubmitionCompleted && (
        <Result
          status={state.isValid ? "success" : "error"}
          title={state.isValid ? "Logged in !" : "Error."}
          subTitle={state.isValid ? "Enjoy :)" : state.textError}
          extra={
            <Button type="primary" key="login">
              <a href="/">Home</a>
            </Button>
          }
        />
      )}
      {/* {state.isSubmitionCompleted && state.isValid && (
        <React.Fragment>
          <DialogTitle id="form-dialog-title">Logged In!</DialogTitle>
          <DialogContent>
            <DialogContentText>You successfully logged in</DialogContentText>
            <DialogActions>
              <Button
                type="button"
                className="outline"
                // onClick={handleClose}
              >
                Back to app
              </Button>
            </DialogActions>
          </DialogContent>
        </React.Fragment>
      )} */}
      {state.isSubmitionCompleted && !state.isValid && (
        <React.Fragment>
          <DialogTitle id="form-dialog-title">Oupsy!</DialogTitle>
          <DialogContent>
            <DialogContentText>{state.textError}</DialogContentText>
            <DialogActions>
              <Button
                type="button"
                className="outline"
                // onClick={handleClose}
              >
                Back to app
              </Button>
              {/* <DisplayFormikState {...props} /> */}
            </DialogActions>
          </DialogContent>
        </React.Fragment>
      )}
      {/* </Dialog> */}
    </React.Fragment>
  );
}

export default Login;
