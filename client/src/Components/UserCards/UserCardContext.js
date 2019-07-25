import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import Axios from "axios";

export const UserCardContext = createContext();

export const UserCardProvider = props => {
  const [isLiked, setLiked] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [userInfo] = useState([props.user][0]);

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

  const handleBlock = () => {
    Axios.post("http://localhost:9000/api/rel/block", {
      userSource: props.session.login,
      target: userInfo.login,
      jwt: props.session.uuid,
      blocked: isBlocked
    })
      .then(res => {
        if (res.status === 200) {
          setBlocked(true);
        } else if (res.status === 201) {
          setBlocked(false);
        } else alert("JWT eror, it looks like you are trying to fuck us :)");
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
      if (result.data.length > 0) setLiked(true);
    };
    const getBlock = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/rel/block?userSource=${
          props.session.login
        }&target=${userInfo.login}&jwt=${props.session.uuid}`
      );
      if (result.data.length > 0) setBlocked(true);
    };

    getBlock();
    getLike();
  });

  return (
    <UserCardContext.Provider
      value={[isLiked, handleLike, isBlocked, handleBlock, userInfo]}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};
