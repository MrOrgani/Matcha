import React, { useContext } from "react";
import Messages from "./Components/Messages";
import ChatInput from "./Components/ChatInput";
import { AuthContext } from "../../../../AuthContext";
import "./ChatApp.css";
import { TempChatContext } from "../../TempChatContext";

// Inspiration https://medium.com/@coderacademy/you-can-build-an-fb-messenger-style-chat-app-with-reactjs-heres-how-intermediate-211b523838ad
const ChatApp = () => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatAppContext] = useContext(TempChatContext);

  const sendHandler = content => {
    let msg = {
      jwt: authContext.data.jwt,
      uuidSource: authContext.data.uuid,
      content: content
    };
    // console.log("chatMessage sent from client");
    socketContext.socket.emit("chatMessage", msg);
  };

  socketContext.socket.off("chatMessage"); //unsubscribe to all previous listeners in case the context made reruns
  socketContext.socket.on("chatMessage", msg => {
    let newMessage = {
      uuidSource: msg.uuidSource,
      target: msg.target,
      jwt: authContext.data.jwt,
      content: msg.content,
      h: msg.h,
      m: msg.m
    };
    // console.log("front sends message to controller", msg, authContext.data.jwt);
    chatAppContext.setMessages(chatAppContext.messages.concat(newMessage));
  });

  return (
    <div className="ChatAppContainer">
      <h3>CHAT TITLE</h3>
      <Messages className="messages" />
      <ChatInput onSend={sendHandler} />
    </div>
  );
};

export default ChatApp;
