import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./../../AuthContext";

export const UserCardContext = createContext();

export const UserCardProvider = props => {
  const [isLiked, setLiked] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [userInfo] = useState([props.user][0]);
  const [socketContext] = useContext(AuthContext);

  // console.log("le truc bizarre [props.user][0]", [props.user][0]);
  const handleLike = () => {
    // console.log("in handle like", props.session);
    axios
      .post(
        `http://localhost:9000/api/rel/like?uuidSource=${props.session.uuid}&jwt=${props.session.jwt}`,
        {
          uuidSource: props.session.uuid,
          target: userInfo.login,
          jwt: props.session.jwt,
          liked: isLiked
        }
      )
      // .post("http://localhost:9000/api/rel/like", {
      //   uuidSource: props.session.uuid,
      //   target: userInfo.login,
      //   jwt: props.session.jwt,
      //   liked: isLiked
      // })
      .then(res => {
        if (res.status === 200) {
          console.log("in handle like ret 200", userInfo.uuid);
          setLiked(true);
          socketContext.socket.emit("newNotif", {
            uuidSource: props.session.uuid,
            targetUuid: userInfo.uuid,
            jwt: props.session.jwt,
            type: "liked"
          });
        } else if (res.status === 201) {
          setLiked(false);
          socketContext.socket.emit("newNotif", {
            uuidSource: props.session.uuid,
            targetUuid: userInfo.uuid,
            jwt: props.session.jwt,
            type: "disliked"
          });
        } else alert("JWT eror");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // socketContext.socket.on("newNotif", msg => {
  //   console.log("userCardContext", msg);
  //   let newMessage = {
  //     uuidSource: msg.uuidSource,
  //     target: msg.target,
  //     jwt: authContext.data.jwt,
  //     content: msg.content,
  //     h: msg.h,
  //     m: msg.m
  //   };
  //   // console.log("front sends message to controller", msg, authContext.data.jwt);
  //   // chatAppContext.setMessages(chatAppContext.messages.concat(newMessage));
  // });

  const handleBlock = () => {
    axios
      .post("http://localhost:9000/api/rel/block", {
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
    const api2 = `?uuidSource=${props.session.uuid}&target=${userInfo.login}&jwt=${props.session.jwt}`;

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
  }, [props.session, userInfo.login]);

  return (
    <UserCardContext.Provider
      value={[isLiked, handleLike, isBlocked, handleBlock, userInfo]}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};
