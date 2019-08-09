import React, { createContext, useContext, useState } from "react";
import axios from "axios";
// export const ChatAppContext = createContext();

// export const chatAppProvider = props => {
//   const [chatTarget, setChatTarget] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       login: "asdf",
//       content: "coucou ma couille"
//     },
//     {
//       login: "mamen",
//       content: "Ici les messages de la db"
//     }
//   ]);

//   useEffect(
//     _ => {
//       console.log("chattarget in chatappcontext :", chatTarget);
//       const api = `?uuidSource=${
//         authContext.data.uuid
//       }&target=${chatTarget}&jwt=${authContext.data.jwt}`;

//       const fetchData = async () => {
//         const result = await axios(
//           `http://localhost:9000/api/chatMessages${api}`
//         );
//         console.log("fetchData, ", result);
//         setMessages(messages.concat(result.data));
//       };

//       fetchData();
//     },
//     [chatTarget]
//   );

//   return (
//     <ChatContext.Provider
//       value={[chatTarget, setChatTarget, messages, setMessages]}
//     >
//       {props.children}
//     </ChatContext.Provider>
//   );
// };
