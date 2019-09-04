import React from "react";
import ChatMenu from "./Components/ChatMenu/MenuChat";
import "./Chat.css";
import { ChatProvider } from "./ChatContext";
import ChatApp from "./Components/ChatApp/ChatApp";
import { ChatMenuProvider } from "./ChatMenuContext";

const Chat = () => {
  return (
    <div className="ChatContainer">
      <ChatProvider>
        <ChatMenuProvider source={JSON.parse(sessionStorage.getItem("data"))}>
          <ChatMenu />
        </ChatMenuProvider>
        <ChatApp id="chatApp" />
      </ChatProvider>
    </div>
  );
};

export default Chat;
