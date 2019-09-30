import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);
  const [pop, setPop] = useState([50, 100]);
  const [dist, setDist] = useState(1000);
  const [sort, setSort] = useState("");
  const [ord, setOrd] = useState(true);
  const [tags, setTags] = useState([]);
  const [fire, setFire] = useState(false);
  const usersValue = {
    users,
    setUsers,
    matchUsers,
    setMatchUsers
  };
  const filtersValue = {
    gender,
    setGender,
    age,
    setAge,
    pop,
    setPop,
    dist,
    setDist,
    sort,
    setSort,
    ord,
    setOrd,
    tags,
    setTags,
    fire,
    setFire
  };
  const [, authContext] = useContext(AuthContext);
  const data = authContext.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let [result, resultMatch] = await Promise.all([
          axios(
            `http://localhost:9000/api/getusers/withhobbies?uuidSource=${data.uuid}&gender=${data.gender}&lookingFor=${data.lookingFor}`
          ),
          axios(
            `http://localhost:9000/api/getusers/matcher?uuidSource=${data.uuid}&gender=${data.gender}&lookingFor=${data.lookingFor}`
          )
        ]);
        console.log(result.data);
        // result.data ? setUsers(result.data) : setUsers([]);
        resultMatch.data.length > 0
          ? setUsers(result.data)
          : setUsers(["noResult"]);
        // resultMatch.data ? setMatchUsers(resultMatch.data) : setMatchUsers([]);
        // if (result.data) setUsers(result.data);
        // if (resultMatch.data) setMatchUsers(resultMatch.data);
        resultMatch.data.length > 0
          ? setMatchUsers(resultMatch.data)
          : setMatchUsers(["noResult"]);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, [data.uuid, data.gender, data.sexualOrientation, data.lookingFor, fire]);

  return (
    <UsersContext.Provider value={[usersValue, filtersValue]}>
      {props.children}
    </UsersContext.Provider>
  );
};
