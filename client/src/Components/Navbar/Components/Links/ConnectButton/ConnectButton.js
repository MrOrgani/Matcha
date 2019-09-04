import React, {
  useState
  //  useContext
} from "react";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import axios from "axios";
// import { Formik } from "formik";
// import { LoginValidation } from "../../../../Scenes/Home/Components/UserValidation";
// import { AuthContext } from "../../../../AuthContext";
// import { AuthContext } from "../../../../AuthContext";
// import { socket } from "../../../../Components/Navbar/NavBar";
import "../../../NavBar.css";

import Login from "./ConDialBox/Login";
import Register from "./ConDialBox/Register";
import ForgotPass from "./ConDialBox/ForgotPass";

import Tabs from "./Tabs";
import { ConnectButtonProvider } from "./ConnectButtonContext";

function ConnectButton() {
  const [open, setOpen] = useState(false);
  // const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);
  // const [isValid, setValid] = useState(true);
  // const [textError, setTextError] = useState("");
  // const [socketContext, authContext] = useContext(AuthContext);

  function handleClose() {
    // setValid(true);
    // setTextError("");
    setOpen(false);
  }

  function handleClickOpen() {
    // setSubmitionCompleted(false);
    setOpen(true);
  }

  // const initialState = {
  //   login: "",
  //   password: ""
  // };

  // console.log("socketContext = ", socketContext);

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        style={{ color: "white", marginLeft: "auto" }}
      >
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <ConnectButtonProvider>
          <Tabs>
            <div label="Register">
              <Register />
            </div>
            <div label="Login">
              <Login />
            </div>
            <div label="Forgot Password">
              <ForgotPass />
            </div>
          </Tabs>
        </ConnectButtonProvider>
      </Dialog>
    </React.Fragment>
  );
}

export default ConnectButton;
