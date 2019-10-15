import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./../../AuthContext";
import { notify } from "react-notify-toast";

export const UserCardContext = createContext();
export const UserCardProvider = props => {
  const [isLiked, setLiked] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [userInfo] = useState([props.user][0]);
  const [socketContext] = useContext(AuthContext);

  const handleLike = async () => {
    await axios
      .post(
        `http://localhost:9000/api/rel/like?uuidSource=${props.session.uuid}&jwt=${props.session.jwt}`,
        {
          uuidSource: props.session.uuid,
          target: userInfo.uuid,
          jwt: props.session.jwt
        }
      )
      .then(res => {
        if (res.status === 200 && res.data.liked) {
          setLiked(true);
          socketContext.socket.emit("newNotif", {
            uuidSource: props.session.uuid,
            targetUuid: userInfo.uuid,
            jwt: props.session.jwt,
            type: "liked"
          });
        } else {
          res.data.blocked &&
            notify.show("You cannot like someone you blocked", "error");
          setLiked(false);
        }
      })
      .catch(err => console.log(err));
  };

  const handleBlock = () => {
    axios
      .post("http://localhost:9000/api/rel/block", {
        uuidSource: props.session.uuid,
        target: userInfo.uuid,
        jwt: props.session.jwt
      })
      .then(res => {
        setLiked(false); //long story short, the work is done in the back
        if (res.status === 200 && res.data.blocked) setBlocked(true);
        else setBlocked(false);
      })
      .catch(err => console.log("error in the axios", err));
  };

  useEffect(() => {
    let isSubscribed = true;
    const api1 = `http://localhost:9000/api/rel/`;
    const api2 = `?uuidSource=${props.session.uuid}&target=${userInfo.uuid}&jwt=${props.session.jwt}`;

    const getLike = async () => {
      const result = await axios.get(`${api1}like${api2}`);
      if (result.data && isSubscribed) setLiked(true);
    };

    const getBlock = async () => {
      const result = await axios.get(`${api1}block${api2}`);
      if (result.data && isSubscribed) setBlocked(true);
    };

    getBlock();
    getLike();
    return () => (isSubscribed = false);
  }, [props.session, userInfo.uuid]);

  return (
    <UserCardContext.Provider
      value={[isLiked, handleLike, isBlocked, handleBlock, userInfo]}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};
