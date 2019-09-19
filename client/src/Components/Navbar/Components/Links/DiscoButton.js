import React, { useContext } from "react"; // useState
import Button from "@material-ui/core/Button";
import "../../NavBar.css";
import { AuthContext } from "../../../../AuthContext";

function DiscoButton() {
  const [socketContext] = useContext(AuthContext);

  function disconnect() {
    sessionStorage.data = "";
    sessionStorage.isAuth = "0";
    window.location = "/";
    socketContext.socket.emit("logOut");
  }

  return (
    <React.Fragment>
      <Button onClick={disconnect} style={{ color: "white" }}>
        Logout
      </Button>
    </React.Fragment>
  );
}

export default DiscoButton;
