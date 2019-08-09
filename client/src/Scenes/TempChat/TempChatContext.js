import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const TempChatContext = React.createContext([{}, () => {}]);

const TempChatProvider = props => {
  const [socketContext, authContext] = useContext(AuthContext);
  const [chatTarget, setChatTarget] = useState({});
  const [messages, setMessages] = useState([
    {
      login: "asdf",
      uuid: "538f9370-592c-44dd-8619-6f178b83479e",
      content: "coucou ma couille"
      // displayName: "Aasdf A"
    },
    {
      login: "mamen",
      uuid: "",
      content: "Ici les fake messages de la db"
      // displayName: "Mamen A"
    }
  ]);

  const fetchData = async () => {
    const result = await axios(
      `http://localhost:9000/api/chatMessages?uuidSource=${
        authContext.data.uuid
      }&target=${chatTarget.uuid}&jwt=${authContext.data.jwt}`
    );
    setMessages(messages.concat(JSON.parse(result.data[0])));
    console.log("PREVIOUS MESSAGES LOADED");
  };

  useEffect(() => {
    socketContext.socket.emit("joinRoom", chatTarget);
    chatTarget.uuid && fetchData();
    console.log("CHATTARGET WAS CHANGED --> JOINING ROOM: ", chatTarget.uuid);
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
