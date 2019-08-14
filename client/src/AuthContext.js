import React, { createContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

export const AuthContext = createContext();

//HOW TO USE WHEN IMPORT
// WE EXPORT 2 OBJECTS authContext (isauth. data ....) and socketContext
//-->  const [socketContext, authContext] = useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // ISAUTH IS IN CONTEXT TO MAKE THE CONTEXT REFRESH
  // AND UPDATE SOCKET AUTOMATICALLY
  const [isAuth, setIsAuth] = useState(
    JSON.parse(sessionStorage.isAuth || "0")
  );
  const [data, setData] = useState(JSON.parse(sessionStorage.data || null));

  useEffect(() => {
    sessionStorage.isAuth = JSON.stringify(isAuth);
    sessionStorage.data = data ? JSON.stringify(data) : "";
  }, [isAuth, data]);

  const authContext = {
    isAuth,
    setIsAuth,
    data,
    setData
  };

  // SOCKET MANAGEMENT
  const socketContext = {};
  const notifArray = [
    {
      d: 3,
      h: 12,
      m: 20,
      uuidSource: "538f9370-592c-44dd-8619-6f178b83479e",
      targetUuid: "538f9370-592c-44dd-8619-6f178b83479e",
      type: "message"
    },
    {
      d: 4,
      h: 13,
      m: 27,
      uuidSource: "59c4b346-0da6-4953-aa2e-f3de02d86fbb",
      targetUuid: "59c4b346-0da6-4953-aa2e-f3de02d86fbb",
      type: "message"
    }
  ];

  if (data && isAuth > 0) {
    // Websocket or polling: https://stackoverflow.com/questions/28238628/socket-io-1-x-use-websockets-only#targetText=There%20are%20two%20types%20of,actually%20initiate%20a%20webSocket%20connection.
    const socket = socketIOClient.connect("http://localhost:9000", {
      transports: ["websocket"],
      requestTimeout: 5000, // IN CASE OF FIRE BREACK GLASS
      upgrade: false,
      query: {
        // token: this.state.userToken
        login: data.login,
        uuid: data.uuid
        // room_id: this.state.room_id
      }
    });

    socketContext.socket = socket;
    socketContext.notifArray = notifArray;
  }

  return (
    <AuthContext.Provider value={[socketContext, authContext]}>
      {children}
    </AuthContext.Provider>
  );
};
