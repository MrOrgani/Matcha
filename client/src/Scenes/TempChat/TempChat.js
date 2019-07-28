import React from "react";
import MenuChat from "./Components/MenuChat";
// import "./TempChat.css";
import {TempChatProvider} from "./Components/TempChatContext";

const TempChat = () => {
  return (
    <div>
      <TempChatProvider source={JSON.parse(sessionStorage.getItem('data'))}>
      <MenuChat />
      </TempChatProvider>

    </div>
  );
};

export default TempChat;
