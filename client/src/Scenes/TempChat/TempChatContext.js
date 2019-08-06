import React, { useState, useEffect } from "react";
import axios from "axios";

const TempChatContext = React.createContext([{}, () => {}]);

const TempChatProvider = props => {
  const [iMatched, setIMatched] = useState([]);
  const [likedMe, setLikedMe] = useState([]);
  const [iLiked, setILiked] = useState([]);
  const [visitedMe, setVisitedMe] = useState([]);
  const [iVisited, setIVisited] = useState([]);
  const [iBlocked, setIBlocked] = useState([]);
  const [openKeys, setOpenKeys] = useState([""]);
  const [chatTarget, setChatTarget] = useState("");

  useEffect(() => {
    const api = `http://localhost:9000/api/tempchat/affinities?userSource=${
      props.source.login
    }&jwt=${props.source.jwt}&`;

    const getIMatched = async () => {
      // console.log(`${api}s=Me&r=MATCHED&t=User&w=t`);
      const result = await axios.get(`${api}s=Me&r=MATCHED&t=User&w=t`);
      // console.log(api);
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

    getIMatched();
    getLikedMe();
    getILiked();
    getVisitedMe();
    getIVisited();
    getIBlocked();
  }, []);

  // console.log("TEMP CHAT CONTECT liked me", likedMe);
  return (
    <TempChatContext.Provider
      value={[
        iMatched,
        likedMe,
        iLiked,
        visitedMe,
        iVisited,
        iBlocked,
        openKeys,
        setOpenKeys,
        chatTarget,
        setChatTarget
      ]}
    >
      {props.children}
    </TempChatContext.Provider>
  );
};

export { TempChatContext, TempChatProvider };
