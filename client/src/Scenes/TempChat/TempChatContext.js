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

  useEffect(() => {
    const api = `http://localhost:9000/api/tempchat/affinities?userSource=${
      props.source.login
    }&jwt=${props.source.jwt}&`;

    const getIMatched = async () => {
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
<<<<<<< HEAD:client/src/Scenes/TempChat/Components/TempChatContext.js
      const result = await axios.get(`${api}s=User&r=VISITED&t=me&w=s`);
      setVisitedMe(result.data);
=======
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/visitedMe?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let visitedMe = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          visitedMe.push(user._fields[0].properties);
        });
      setVisitedMe(visitedMe);
>>>>>>> 38d06ae986f0fd9edbe19243a763e5ba5bff1300:client/src/Scenes/TempChat/TempChatContext.js
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
      value={[iMatched, likedMe, iLiked, visitedMe, iVisited, iBlocked]}
    >
      {props.children}
    </TempChatContext.Provider>
  );
};

export { TempChatContext, TempChatProvider };
