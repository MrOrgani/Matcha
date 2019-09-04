import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const ChatContext = React.createContext([{}, () => {}]);

const ChatProvider = props => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatTarget, setChatTarget] = useState({});
  const basicContent = {
    content:
      "Welcome to the chat, click on one of your match to get a conversation going"
  };
  const [messages, setMessages] = useState([basicContent]);

  // 2 EFFECTS EVERYTIME WE SELECT A PROFILE
  // 1. GET THE MESSAGES FROM THE DB
  //   getter: fetchData
  // 2. COMMUNICATE WITH THE BACK SOCKET WHO WE ARE TALKING WITH
  useEffect(() => {
    if (chatTarget.matched) {
      const fetchMsg = async () => {
        const result = await axios(
          `http://localhost:9000/api/chatMessages?uuidSource=${authContext.data.uuid}&target=${chatTarget.uuid}&jwt=${authContext.data.jwt}`
        );
        return result.data
          ? result.data
          : [{ content: "you do not have a conversation yet" }];
      };
      chatTarget.uuid && fetchMsg().then(setMessages);
      socketContext.socket.emit("joinRoom", chatTarget);
    } else {
      setMessages([
        {
          content:
            "Welcome to the chat, click on one of your match to get a conversation going"
        }
      ]);
    }
  }, [chatTarget, socketContext.socket, authContext.data]);

  const chatAppContext = {
    chatTarget,
    setChatTarget,
    messages,
    setMessages
  };

  return (
    <ChatContext.Provider value={[chatAppContext]}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
