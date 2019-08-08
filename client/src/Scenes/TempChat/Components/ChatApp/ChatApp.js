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
  const [, , , , , , , , chatTarget] = useContext(TempChatContext);
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
  console.log(chatTarget);
  useEffect(_ => {
    //need to get the target uuid
    const api = `?uuidSource=${
      authContext.data.uuid
    }&target=${chatTarget}&jwt=${authContext.data.jwt}`;
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:9000/api/chatMessages${api}`
      );
      console.log(result);
      setMessages(messages.concat(result.data));
    };
    chatTarget && fetchData();
  }, []);

  const sendHandler = content => {
    let msg = {
      content: content,
      target: chatTarget
      // uuidSource: authContext.uuid
    };
    socketContext.socket.emit("chatMessage", msg);
  };

  socketContext.socket.on("chatMessage", msg => {
    // console.log("new messages pushed: ", msg); //JE NE COMPRENDS PAS MAIS APPAREMMENT ON PASSE 8 FOIS ICI PAR MESSAGE
    let newMessage = { login: msg.login, content: msg.content };
    console.log(msg);
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
