import React from "react";
import Message from "./Message";
import "../ChatApp.css";

const Messages = props => {
  // console.log(props.messages[0]);
  const messagesDiv = props.messages[0].map((message, i) => {
    // console.log(message);
    return <Message key={i} login={message.login} content={message.content} />;
  });

  return (
    <div className="messages" id="messageList">
      {messagesDiv}
    </div>
  );
};

export default Messages;
