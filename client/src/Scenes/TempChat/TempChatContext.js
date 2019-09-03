import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const TempChatContext = React.createContext([{}, () => {}]);

const TempChatProvider = props => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatTarget, setChatTarget] = useState({});
  const [messages, setMessages] = useState([
    {
      content:
        "Welcome to the chat, click on an icon to get a conversation going"
    }
  ]);

  // 2 EFFECTS EVERYTIME WE SELECT A PROFILE
  // 1. GET THE MESSAGES FROM THE DB
  //   getter: fetchData
  // 2. COMMUNICATE WITH THE BACK WHO WE ARE TALKING WITH
  useEffect(() => {
    //FETCH MESSAGES FROM THE BACK
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:9000/api/chatMessages?uuidSource=${authContext.data.uuid}&target=${chatTarget.uuid}&jwt=${authContext.data.jwt}`
      );
      return result.data ? result.data : [];
    };
    chatTarget.uuid && fetchData().then(setMessages);

    //TELL THE BACK WE ENTERED A CHATROOM,
    socketContext.socket.emit("joinRoom", chatTarget);
  }, [chatTarget, socketContext.socket, authContext.data]);

  const chatAppContext = {
    chatTarget,
    setChatTarget,
    messages,
    setMessages
  };

  return (
    <TempChatContext.Provider value={[chatAppContext]}>
      {props.children}
    </TempChatContext.Provider>
  );
};

export { TempChatContext, TempChatProvider };
