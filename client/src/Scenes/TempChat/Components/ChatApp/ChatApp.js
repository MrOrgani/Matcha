import React, { useState, useEffect, useContext } from "react";
import Messages from "./Components/Messages";
import ChatInput from "./Components/ChatInput";
import { AuthContext } from "../../../../AuthContext";
import "./ChatApp.css";
import { TempChatContext } from "../../TempChatContext";

//getthe messages from db, export them at each send
// create the room and send messages in --> listen in the back
const ChatApp = () => {
  const [socketContext, authContext] = useContext(AuthContext);
  // const [iMatched, , , , , , OpenKeys] = useContext(TempChatContext);
  // console.log(iMatched);
  // console.log(OpenKeys);

  const [messages, setMessages] = useState([
    {
      login: "asdf",
      content: "coucou ma couille"
    },
    {
      login: "mamen",
      content: "Ici les messages de la db"
    }
  ]);

  const sendHandler = content => {
    let msg = { content: content };
    socketContext.socket.emit("chatMessage", msg);
  };

  socketContext.socket.on("chatMessage", msg => {
    // console.log("new messages pushed: ", msg);
    let newMessage = { login: msg.login, content: msg.content };
    setMessages(messages.concat(newMessage));
  });

  return (
    <div className="ChatAppContainer">
      <h3>CHAT TITLE</h3>
      <Messages messages={[messages, setMessages]} className="messages" />
      <ChatInput onSend={sendHandler} />
    </div>
  );
};

export default ChatApp;
