import React, { useContext } from "react";
import Messages from "./Components/Messages";
import ChatInput from "./Components/ChatInput";
import { AuthContext } from "../../../../AuthContext";
import "./ChatApp.css";
import { ChatContext } from "../../ChatContext";

// Inspiration https://medium.com/@coderacademy/you-can-build-an-fb-messenger-style-chat-app-with-reactjs-heres-how-intermediate-211b523838ad
const ChatApp = () => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatAppContext] = useContext(ChatContext);

  // Sends a msg to the back --> le distribue a tous les gens dans la room
  // Sends a notification to the back --> le distribue a tous les uuid concernes
  const sendHandler = content => {
    if (!chatAppContext.chatTarget.uuid) {
      return;
    }
    let msg = {
      jwt: authContext.data.jwt,
      uuidSource: authContext.data.uuid,
      content: content,
      targetUuid: chatAppContext.chatTarget.uuid
    };
    socketContext.socket.emit("chatMessage", msg);

    const notif = {
      targetUuid: chatAppContext.chatTarget.uuid,
      type: "message",
      uuidSource: authContext.data.uuid
    };
    console.log("in chatapp sends notif : ", notif);
    socketContext.socket.emit("newNotif", notif);
  };
  // console.log("chatTaregt", chatAppContext.chatTarget);

  socketContext.socket && socketContext.socket.off("chatMessage"); //unsubscribe to all previous listeners in case the context made reruns
  socketContext.socket.on("chatMessage", msg => {
    let newMessage = {
      uuidSource: msg.uuidSource,
      target: msg.target,
      jwt: authContext.data.jwt,
      content: msg.content,
      h: msg.h,
      m: msg.m
    };
    console.log("front receives message from controller", msg);
    chatAppContext.setMessages(chatAppContext.messages.concat(newMessage));
  });

  return (
    <div className="ChatAppContainer">
      <Messages className="messages" />
      <ChatInput onSend={sendHandler} />
    </div>
  );
};

export default ChatApp;
