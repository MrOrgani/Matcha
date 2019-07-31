import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const prevIsAuth = sessionStorage.getItem("isAuth") || 0;
  // console.log(sessionStorage.data);
  const prevData =
    (sessionStorage.data && JSON.parse(sessionStorage.data)) || null;
  const [isAuth, setIsAuth] = useState(prevIsAuth);
  const [data, setData] = useState(prevData);

  useEffect(() => {
    // console.log(data);
    (() => {
      if (data) sessionStorage.data = JSON.stringify(data);
      else sessionStorage.removeItem("data");
    })();
    sessionStorage.isAuth = isAuth;
    console.log(
      "AUTH CONTEXT USE EFFECT TRIGERED, data  = ",
      data,
      " isAuth = ",
      isAuth
    );
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
