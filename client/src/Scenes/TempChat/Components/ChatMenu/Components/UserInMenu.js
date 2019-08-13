import React, { useContext } from "react";
import "./UserInMenu.css";
import { TempChatContext } from "../../../TempChatContext";
// import { AuthContext } from "../../../../../AuthContext";

const UserInMenu = props => {
  const [chatAppContext] = useContext(TempChatContext);

  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const picture =
    props.data.fileList &&
    props.data.fileList[0] &&
    JSON.parse(props.data.fileList[0]).url;
  // console.log(JSON.parse(props.data.fileList[0]).url);
  return (
    <div
      style={{ display: "flex" }}
      onClick={async () => {
        console.log(props.data);
        await chatAppContext.setChatTarget({
          uuid: props.data.uuid,
          displayName:
            capFLtr(props.data.firstName) + " " + capFLtr(props.data.lastName),
          picture: picture
        });
      }}
    >
      <img
        style={{ borderRadius: "50%", width: "20%", height: "20%" }}
        alt=""
        src={picture}
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
