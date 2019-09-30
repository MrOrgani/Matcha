import React, { useContext } from "react";
import ChatMenu from "./Components/ChatMenu/ChatMenu";
import "./Chat.css";
import { ChatProvider } from "./ChatContext";
import ChatApp from "./Components/ChatApp/ChatApp";
import { ChatMenuProvider } from "./ChatMenuContext";
import { AuthContext } from "../../AuthContext";

const Chat = () => {
  const [, authContext] = useContext(AuthContext);
  if (!authContext.data.isComplete) window.location = "/Profile";

  return (
    <div className="ChatContainer">
      <ChatProvider>
        <ChatMenuProvider source={authContext.data}>
          <ChatMenu />
        </ChatMenuProvider>
        <ChatApp id="chatApp" />
      </ChatProvider>
    </div>
  );
};

export default Chat;
