import React, { createContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

export const AuthContext = createContext();

//HOW TO USE WHEN IMPORT
// WE EXPORT 2 OBJECTS authContext (isauth. data ....) and socketContext

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

  if (data && isAuth > 0) {
    // Websocket or polling: https://stackoverflow.com/questions/28238628/socket-io-1-x-use-websockets-only#targetText=There%20are%20two%20types%20of,actually%20initiate%20a%20webSocket%20connection.
    const socket = socketIOClient.connect("http://localhost:9000", {
      transports: ["websocket"],
      requestTimeout: 5000, // IN CASE OF FIRE BREACK GLASS
      upgrade: false,
      query: {
        login: data.login,
        uuid: data.uuid
      }
    });
    socket.on("newConnection", connectedUsrs => {
      socketContext.connectedUsrs = connectedUsrs;
    });
    socketContext.socket = socket;
  }

  //LOCATION UPDATE
  if (data && isAuth > 0) {
    (async () => {
      await navigator.geolocation.getCurrentPosition(
        position => {
          data.location[0] = position.coords.latitude;
          data.location[1] = position.coords.longitude;
        },
        async () => {
          const api = await fetch("https://ipapi.co/json");
          const api_json = await api.json();
          data.location[0] = api_json.latitude;
          data.location[1] = api_json.longitude;
        }
      );
      axios
        .put(`http://localhost:9000/api/user/profile?uuidSource=${data.uuid}`, {
          lat: data.location[0],
          lon: data.location[1]
        })
        .catch(err => console.log(err));
    })();
  }

  return (
    <AuthContext.Provider value={[socketContext, authContext]}>
      {children}
    </AuthContext.Provider>
  );
};
