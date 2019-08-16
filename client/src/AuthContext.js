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
  // useEffect(() => {
  // }, []);

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
    // socketContext.notifArray = notifArray;
  }

  return (
    <AuthContext.Provider value={[socketContext, authContext]}>
      {children}
    </AuthContext.Provider>
  );
};
