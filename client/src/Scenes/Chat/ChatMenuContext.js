import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { ChatContext } from "./ChatContext";

const ChatMenuContext = React.createContext([{}, () => {}]);

const ChatMenuProvider = props => {
  const [chatAppContext] = useContext(ChatContext);
  const [socketContext] = useContext(AuthContext);

  const [iMatched, setIMatched] = useState([]);
  const [likedMe, setLikedMe] = useState([]);
  const [iLiked, setILiked] = useState([]);
  const [visitedMe, setVisitedMe] = useState([]);
  const [iVisited, setIVisited] = useState([]);
  const [iBlocked, setIBlocked] = useState([]);
  const [openKeys, setOpenKeys] = useState([""]);

  // *** BEAUTIFULL CODE INCOMMIIIIING LIST UPDATE VARIABLES *** //
  const api = `http://localhost:9000/api/chat/affinities?uuidSource=${props.source.uuid}&jwt=${props.source.jwt}&`;

  const getIMatched = useCallback(async () => {
    const result = await axios.get(`${api}s=Me&r=MATCHED&t=User&w=t`);
    setIMatched(result.data);
  }, [api]);

  const getLikedMe = useCallback(async () => {
    const result = await axios.get(`${api}s=User&r=LIKED&t=me&w=s`);
    setLikedMe(result.data);
  }, [api]);

  const getILiked = useCallback(async () => {
    const result = await axios.get(`${api}s=Me&r=LIKED&t=User&w=t`);
    setILiked(result.data);
  }, [api]);

  const getVisitedMe = useCallback(async () => {
    const result = await axios.get(`${api}s=User&r=VISITED&t=me&w=s`);
    setVisitedMe(result.data);
  }, [api]);

  const getIVisited = useCallback(async () => {
    const result = await axios.get(`${api}s=Me&r=VISITED&t=User&w=t`);
    setIVisited(result.data);
  }, [api]);

  const getIBlocked = useCallback(async () => {
    const result = await axios.get(`${api}s=Me&r=BLOCKED&t=User&w=t`);
    setIBlocked(result.data);
  }, [api]);

  useEffect(() => {
    let isSubscribed = false;
    getIMatched(isSubscribed);
    getLikedMe(isSubscribed);
    getILiked(isSubscribed);
    getVisitedMe(isSubscribed);
    getIVisited(isSubscribed);
    getIBlocked(isSubscribed);
    return () => (isSubscribed = false);
  }, [
    getIMatched,
    getLikedMe,
    getILiked,
    getVisitedMe,
    getIVisited,
    getIBlocked
  ]);

  //in case of block update the list and re render the elements
  // Why does it fire 4 times
  useEffect(() => {
    socketContext.socket.on("unmatched", () => {
      getIMatched();
      chatAppContext.setChatTarget({});
    });
  }, [socketContext.socket, getIMatched, chatAppContext]);

  const MenuContext = {
    iMatched,
    getIMatched,
    likedMe,
    getLikedMe,
    iLiked,
    getILiked,
    visitedMe,
    getVisitedMe,
    iVisited,
    getIVisited,
    iBlocked,
    getIBlocked,
    openKeys,
    setOpenKeys
  };
  return (
    <ChatMenuContext.Provider value={[MenuContext]}>
      {props.children}
    </ChatMenuContext.Provider>
  );
};

export { ChatMenuContext, ChatMenuProvider };
