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
    const getIMatched = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/matched?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let iMatched = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          iMatched.push(user._fields[0].properties);
        });
      setIMatched(iMatched);
    };

    const getLikedMe = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/likedMe?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let isLikingMe = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          isLikingMe.push(user._fields[0].properties);
        });
      setLikedMe(isLikingMe);
    };

    const getILiked = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/liked?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      // let iLiked = [];
      // if (result.data.length > 0)
      //   await result.data.forEach(user => {
      //     iLiked.push(user._fields[0].properties);
      //   });
      console.log("result i liked", result);
      setILiked(result.data);
    };

    const getVisitedMe = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/visits?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let visitedMe = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          visitedMe.push(user._fields[0].properties);
        });
      setVisitedMe(visitedMe);
    };

    const getIVisited = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/visited?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let iVisited = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          iVisited.push(user._fields[0].properties);
        });
      setIVisited(iVisited);
    };

    const getIBlocked = async () => {
      const result = await axios.get(
        `http://localhost:9000/api/tempchat/blocked?userSource=${
          props.source.login
        }&jwt=${props.source.jwt}`
      );
      let iBlocked = [];
      if (result.data.length > 0)
        await result.data.forEach(user => {
          iBlocked.push(user._fields[0].properties);
        });
      setIBlocked(iBlocked);
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
