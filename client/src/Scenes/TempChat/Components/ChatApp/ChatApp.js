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
      content: content
    };
    console.log("chatMessage sent from client");
    socketContext.socket.emit("chatMessage", msg);
  };

  socketContext.socket.on("chatMessage", msg => {
    let newMessage = {
      content: msg.content
    };
    console.log("front sends message to controller");
    axios.post("http://localhost:9000/api/chatMessages/", {
      uuidSource: msg.uuidSource,
      target: msg.target,
      jwt: authContext.jwt,
      content: msg.content,
      h: msg.h,
      m: msg.m
    });
    // console.log(
    //   "newmessage from api = ",
    //   msg,
    //   "oldMessage = ",
    //   chatAppContext.messages
    // );
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
