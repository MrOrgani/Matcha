import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const prevIsAuth = sessionStorage.getItem("isAuth") || 0;
  const prevData = JSON.parse(sessionStorage.getItem("data")) || null;
  const [isAuth, setIsAuth] = useState(prevIsAuth);
  const [data, setData] = useState(prevData);

  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(data));
    sessionStorage.isAuth = isAuth;
    console.log("inAuthContext, data  = ", data, " isAuth = ", isAuth);
  }, [isAuth, data]);

  const defaultContext = {
    isAuth,
    setIsAuth,
    data,
    setData
  };

  return (
    <AuthContext.Provider value={defaultContext}>
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
