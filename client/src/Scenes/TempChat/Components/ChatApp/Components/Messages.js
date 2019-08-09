import React, { useContext } from "react";
import Message from "./Message";
import "../ChatApp.css";
import { TempChatContext } from "../../../TempChatContext";

const Messages = props => {
  const [chatAppContext] = useContext(TempChatContext);
  // console.log(chatAppContext.messsages);
  const messagesDiv = chatAppContext.messages.map((message, i) => {
    // console.log(message);
    return (
      <Message
        key={i}
        uuidviewer={JSON.parse(sessionStorage.data).uuid}
        uuidSource={message.uuid}
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
