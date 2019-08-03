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
      jwt: props.session.jwt,
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
      jwt: props.session.jwt,
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
    const api1 = `http://localhost:9000/api/rel/`;
    const api2 = `?userSource=${props.session.login}&target=${
      userInfo.login
    }&jwt=${props.session.jwt}`;

    const getLike = async () => {
      const result = await axios.get(`${api1}like${api2}`);
      if (result.data) setLiked(true);
    };

    const getBlock = async () => {
      const result = await axios.get(`${api1}block${api2}`);
      if (result.data) setBlocked(true);
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
