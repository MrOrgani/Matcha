import React, { useState, useEffect, useContext } from "react";
import Messages from "./Components/Messages";
import ChatInput from "./Components/ChatInput";
import { AuthContext } from "../../../../AuthContext";
import "./ChatApp.css";
import axios from "axios";
import { TempChatContext } from "../../TempChatContext";

//getthe messages from db, export them at each send
// create the room and send messages in --> listen in the back
// Inspiration https://medium.com/@coderacademy/you-can-build-an-fb-messenger-style-chat-app-with-reactjs-heres-how-intermediate-211b523838ad
const ChatApp = () => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatAppContext] = useContext(TempChatContext);

  const sendHandler = content => {
    let msg = {
      jwt: authContext.data.jwt,
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
    // axios
    //   .post("http://localhost:9000/api/chatMessages/", newMessage)
    //   .then(res => console.log(res));
    chatAppContext.setMessages(chatAppContext.messages.concat(newMessage));
    console.log(chatAppContext.messages);
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
