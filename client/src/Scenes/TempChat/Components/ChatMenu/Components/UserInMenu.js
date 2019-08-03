import React from "react";
import "./UserInMenu.css";

const UserInMenu = props => {
  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div style={{ display: "flex" }} onClick={console.log(props.data)}>
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
        style={{
          alignSelf: "flex-end",
          fontFamily: "Raleway",
          fontSize: "2em",
          paddingLeft: "1em",
          fontStyle: "italic"
        }}
      >
        {capFLtr(props.data.firstName || "Unknown User")}{" "}
        {capFLtr((props.data.lastName && props.data.lastName[0]) || "  ")}
      </div>
    </div>
  );
};

export default UserInMenu;
