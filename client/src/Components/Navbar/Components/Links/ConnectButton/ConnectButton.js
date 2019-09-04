import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import "../../../NavBar.css";

import Login from "./ConDialBox/Login";
import Register from "./ConDialBox/Register";
import ForgotPass from "./ConDialBox/ForgotPass";

import Tabs from "./Tabs";
import { ConnectButtonProvider } from "./ConnectButtonContext";

function ConnectButton() {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        style={{ color: "white", marginLeft: "auto" }}
      >
        Sign in / up
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
