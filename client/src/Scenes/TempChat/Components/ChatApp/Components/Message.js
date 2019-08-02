import React from "react";
import "../ChatApp.css";

const Message = props => {
  //   const fromMe = props.fromMe ? "from-me" : "";

  return (
    <div className="from-me">
      <div className="username">{props.login}</div>
      <div className="message-body">{props.message}</div>
    </div>
  );
};

export default Message;
