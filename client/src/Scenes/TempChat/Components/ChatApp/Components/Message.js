import React from "react";
import "../ChatApp.css";

const Message = props => {
  // console.log(
  //   typeof JSON.parse(sessionStorage.data).login,
  //   JSON.parse(sessionStorage.data).login
  // );
  // console.log(typeof props.login, props.login);
  const fromMe =
    props.login === JSON.parse(sessionStorage.data).login ? "from-me" : "";
  // console.log(props);
  return (
    <div className={`message ${fromMe}`}>
      <div className="username">{props.login}</div>
      <div className="message-body">{props.content}</div>
    </div>
  );
};

export default Message;
