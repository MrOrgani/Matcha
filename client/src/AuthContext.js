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

  // SOCKET MANAGEMENT
  const socketContext = {};

  if (data && isAuth > 0) {
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
  }

  const authContext = {
    isAuth,
    setIsAuth,
    data,
    setData
  };

  return (
    <AuthContext.Provider value={[socketContext, authContext]}>
      {children}
    </AuthContext.Provider>
  );
};

//   const [socket, setSocket] = React.useState({});

//   if (sessionStorage.data) {
//     const endpoint = "http://localhost:9000";
//     const session = JSON.parse(sessionStorage.data);
//     setSocket(
//       socketIOClient.connect(endpoint, {
//         transports: ["polling"],
//         requestTimeout: 5000,
//         upgrade: false,
//         query: {
//           // token: this.state.userToken
//           // userID: this.state.userID,
//           login: session.login
//           // room_id: this.state.room_id
//         }
//       })
//     );
//     console.log(socket);
//   return (
//     <AuthContext.Provider value={[users, setUsers]}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// useEffect(() => {
//     //fetch data from the back to check if the user login and token are valid
//     //If they are, define the context state like so and connect to socket and add to state
//     // If not, define the context and send a message error

//       const authToken = async () => {
//           const result = await axios.get(
//             `http://localhost:9000/api/users/verify`
//           );
//           if (result.data.length > 0) setAuth(true);
//           else
//         }
//         AuthToken();
//   });
