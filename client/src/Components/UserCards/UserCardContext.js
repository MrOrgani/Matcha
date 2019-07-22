import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import Axios from "axios";

export const UserCardContext = createContext();

export const UserCardProvider = props => {
  const [isLiked, setLiked] = useState(false);
  const [userInfo, setUserInfo] = useState([props.user][0]);
  // console.log(props.user);

  const handleLike = () => {
    Axios.post("http://localhost:9000/api/rel/like", {
      userSource: props.session.login,
      target: userInfo.login,
      jwt: props.session.uuid,
      liked: isLiked
    })
      .then(res => {
        if (res.status === 200) {
          setLiked(true);
        } else if (res.status === 201) {
          setLiked(false);
        } else alert("JWT eror");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getLike = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/rel/like?userSource=${
          props.session.login
        }&target=${userInfo.login}&jwt=${props.session.uuid}`
      );
      // console.log(result.data);
      if (result.data.length > 0) setLiked(true);
    };
    getLike();
  });

  return (
    <UserCardContext.Provider
      value={[isLiked, handleLike, userInfo, setUserInfo]}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};
