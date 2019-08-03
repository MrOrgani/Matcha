import React, { useState, useEffect, useContext } from "react";
import Messages from "./Components/Messages";
import ChatInput from "./Components/ChatInput";
import { AuthContext } from "../../../../AuthContext";
import "./ChatApp.css";

const ChatApp = () => {
  const [socket] = useContext(AuthContext);
  const [messages, setMessages] = useState([
    {
      login: "asdf",
      message: "coucou ma couille"
    },
    {
      login: "mamen",
      message: "Ici les messages de la db"
    }
  ]);

  //   console.log(messages);

  const sendHandler = msg => {
    console.log("sendHandler: ", msg);
  };

  return (
    <div className="ChatAppContainer">
      <h3>CHAT TITLE</h3>
      <Messages messages={[messages, setMessages]} className="messages" />
      <ChatInput onSend={sendHandler} />
    </div>
  );
};

export default ChatApp;
