import React from "react";
import ChatMenu from "./Components/ChatMenu/MenuChat";
import "./TempChat.css";
import { TempChatProvider } from "./TempChatContext";
import ChatApp from "./Components/ChatApp/ChatApp";

const TempChat = () => {
  console.log("tempchat", JSON.parse(sessionStorage.getItem("data")));
  return (
    <div className="ChatContainer">
      <TempChatProvider source={JSON.parse(sessionStorage.getItem("data"))}>
        <ChatMenu />
        <ChatApp />
      </TempChatProvider>
    </div>
  );
};

export default TempChat;
