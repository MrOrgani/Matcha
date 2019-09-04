import React, { useContext } from "react"; // useState
import Button from "@material-ui/core/Button";
import "../../NavBar.css";
import { AuthContext } from "../../../../AuthContext";

function ConnectButton() {
  const [socketContext, authContext] = useContext(AuthContext);

  function disconnect() {
    authContext.setData();
    authContext.setIsAuth(0);
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

export default ConnectButton;
