import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const TempChatContext = React.createContext([{}, () => {}]);

const TempChatProvider = props => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatTarget, setChatTarget] = useState({});
  const [messages, setMessages] = useState([
    {
      // uuidSource: "",
      // h: "",
      // m: "",
      content:
        "Welcome to the chat, click on an icon to get a conversation going"
    }
  ]);

  const fetchData = async () => {
    const result = await axios(
      `http://localhost:9000/api/chatMessages?uuidSource=${
        authContext.data.uuid
      }&target=${chatTarget.uuid}&jwt=${authContext.data.jwt}`
    );
    // console.log("PREVIOUS MESSAGES LOADED", result.data);
    result.data && setMessages(result.data);
  };

  useEffect(() => {
    socketContext.socket.emit("joinRoom", chatTarget);
    chatTarget.uuid && fetchData();
    // console.log("CHATTARGET WAS CHANGED --> JOINING ROOM: ", chatTarget.uuid);
  }, [chatTarget.uuid]);

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
