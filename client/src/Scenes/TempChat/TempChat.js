import React from "react";
import ChatMenu from "./Components/ChatMenu/MenuChat";
import "./TempChat.css";
import { TempChatProvider } from "./TempChatContext";
import ChatApp from "./Components/ChatApp/ChatApp";
import { ChatMenuProvider } from "./ChatMenuContext";

const TempChat = () => {
  const userData = JSON.parse(sessionStorage.data);
  if (!userData.isComplete) window.location = "/Profile";

  return (
    <div className="ChatContainer">
      <TempChatProvider>
        <ChatMenuProvider source={JSON.parse(sessionStorage.getItem("data"))}>
          <ChatMenu />
        </ChatMenuProvider>
        <ChatApp id="chatApp" />
      </TempChatProvider>
    </div>
  );
};

export default TempChat;
