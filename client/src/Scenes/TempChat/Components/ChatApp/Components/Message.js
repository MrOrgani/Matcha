import React from "react";
import "../ChatApp.css";

const Message = props => {
  let fromMe = "";
  let displayName = "";
  // console.log(props);
  if (props.uuidMessage === props.uuidSource) fromMe = "from-me";
  else displayName = props.DisplayName;

  return (
    <div className={`message ${fromMe}`}>
      <div className="username">{displayName}</div>
      <div className="message-body">{props.content}</div>
    </div>
  );
};

export default Message;
