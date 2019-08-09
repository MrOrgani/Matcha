import React, { useState } from "react";
import axios from "axios";

const ChatMenuContext = React.createContext([{}, () => {}]);

const ChatMenuProvider = props => {
  const [iMatched, setIMatched] = useState([]);
  const [likedMe, setLikedMe] = useState([]);
  const [iLiked, setILiked] = useState([]);
  const [visitedMe, setVisitedMe] = useState([]);
  const [iVisited, setIVisited] = useState([]);
  const [iBlocked, setIBlocked] = useState([]);
  const [openKeys, setOpenKeys] = useState([""]);

  // *** BEAUTIFULL CODE INCOMMIIIIING LIST UPDATE VARIABLES *** //
  const api = `http://localhost:9000/api/tempchat/affinities?userSource=${
    props.source.login
  }&jwt=${props.source.jwt}&`;
  const getIMatched = async () => {
    // setIMatched(await axios.get(`${api}s=Me&r=MATCHED&t=User&w=t`));
    const result = await axios.get(`${api}s=Me&r=MATCHED&t=User&w=t`);
    setIMatched(result.data);
  };
  const getLikedMe = async () => {
    const result = await axios.get(`${api}s=User&r=LIKED&t=me&w=s`);
    setLikedMe(result.data);
  };
  const getILiked = async () => {
    const result = await axios.get(`${api}s=Me&r=LIKED&t=User&w=t`);
    setILiked(result.data);
  };
  const getVisitedMe = async () => {
    const result = await axios.get(`${api}s=User&r=VISITED&t=me&w=s`);
    setVisitedMe(result.data);
  };
  const getIVisited = async () => {
    const result = await axios.get(`${api}s=Me&r=VISITED&t=User&w=t`);
    setIVisited(result.data);
  };
  const getIBlocked = async () => {
    const result = await axios.get(`${api}s=Me&r=BLOCKED&t=User&w=t`);
    setIBlocked(result.data);
  };
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
  // console.log("TEMP CHAT CONTECT liked me", likedMe);
  return (
    <ChatMenuContext.Provider value={[MenuContext]}>
      {props.children}
    </ChatMenuContext.Provider>
  );
};

export { ChatMenuContext, ChatMenuProvider };
