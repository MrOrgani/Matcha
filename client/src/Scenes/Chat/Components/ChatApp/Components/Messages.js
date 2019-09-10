import React, { useContext, useRef, useEffect } from "react";
import Message from "./Message";
import "../ChatApp.css";
import { ChatContext } from "../../../ChatContext";
import { AuthContext } from "../../../../../AuthContext";

const Messages = () => {
  const [chatAppContext] = useContext(ChatContext);
  const [, authContext] = useContext(AuthContext);
  console.log("Messages", chatAppContext.messages);
  const messagesDiv = chatAppContext.messages.map((message, i) => {
    // console.log(message);
    return (
      <Message
        key={i}
        uuidViewer={authContext.data.uuid}
        uuidSource={message.uuidSource}
        DisplayName={message.displayName}
        content={message.content}
      />
    );
  });

  // HERE WE SCROLL TO BOTTOM OF SCREEN WHEN THE LIST OF MESSAGES CHANGE
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chatAppContext.messages]);

  return (
    <div className="messages" id="messageList">
      {messagesDiv}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
