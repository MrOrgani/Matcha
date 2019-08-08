import React, { useContext } from "react";
import "./UserInMenu.css";
import { TempChatContext } from "../../../TempChatContext";
import { AuthContext } from "../../../../../AuthContext";

const UserInMenu = props => {
  const [, , , , , , , , chatTarget, setChatTarget] = useContext(
    TempChatContext
  );
  const [socketContext, authContext] = useContext(AuthContext);
  // console.log(setChatTarget);

  function capFLtr(string) {
    // console.log(string.charAt(0).toUpperCase() + string.slice(1));
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div
      style={{ display: "flex" }}
      onClick={async () => {
        // console.log(props.data.uuid, setChatTarget);
        await setChatTarget(props.data.uuid);
        console.log("userInMenu :", props.data.uuid);
        // console.log(socketContext);
        socketContext.socket.emit("joinRoom", props.data.uuid);
        // socketContext.socket.join("test");
      }}
    >
      <img
        style={{ borderRadius: "50%", width: "20%", height: "20%" }}
        alt=""
        src={props.data.picMedium}
      />
      <div
        style={{
          width: "10px",
          height: "10px",
          marginTop: "14%",
          marginLeft: "-5%",
          background: "red",
          borderRadius: "50%",
          border: "solid grey 2px"
        }}
      />
      <div
      // style={{
      //   alignSelf: "flex-end",
      //   fontFamily: "Raleway",
      //   fontSize: "2em",
      //   paddingLeft: "1em",
      //   fontStyle: "italic",
      //   background: "black"
      // }}
      >
        {capFLtr(props.data.firstName || "Unknown User")}{" "}
        {capFLtr((props.data.lastName && props.data.lastName[0]) || "  ")}
      </div>
    </div>
  );
};

export default UserInMenu;
