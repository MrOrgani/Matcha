import React, { useContext } from "react";
import Message from "./Message";
import "../ChatApp.css";
import { TempChatContext } from "../../../TempChatContext";
import { AuthContext } from "../../../../../AuthContext";

const Messages = () => {
  const [chatAppContext] = useContext(TempChatContext);
  const [, authContext] = useContext(AuthContext);
  // console.log(chatAppContext.messsages);
  // console.log(authContext);
  const messagesDiv = chatAppContext.messages.map((message, i) => {
    console.log(message);
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

  return (
    <div className="messages" id="messageList">
      {messagesDiv}
    </div>
  );
};

export default Messages;
