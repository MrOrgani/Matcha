import React from "react";
import Message from "./Message";
import "../ChatApp.css";

const Messages = props => {
  console.log(props);
  const messagesDiv = props.messages.map((message, i) => {
    // console.log(message);
    return (
      <Message key={i} username={message.login} message={message.message} />
    );
  });

  return (
    <div className="messages" id="messageList">
      {messagesDiv}
    </div>
  );
};

export default Messages;
