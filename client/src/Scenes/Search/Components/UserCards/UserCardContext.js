import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserCardContext = createContext();

export const UserCardProvider = props => {
  const [isLiked, setLiked] = useState(false);
  const [userInfo, setUserInfo] = useState([props.user][0]);
  // console.log(props.user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await result = await axios(
  //       `http://localhost:9000/api/rel/like&loggedUser=${}`
  //     )
  //   }
  // })

  return (
    <UserCardContext.Provider
      value={[isLiked, setLiked, userInfo, setUserInfo]}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};
