import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);
  const [pop, setPop] = useState([50, 100]);
  const [dist, setDist] = useState(1000);
  const [sort, setSort] = useState("");
  const [ord, setOrd] = useState(true);
  const [tags, setTags] = useState([]);
  const usersValue = {
    users,
    setUsers
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
    setTags
  };
  const [, authContext] = useContext(AuthContext);
  const data = authContext.data;

  useEffect(() => {
    const fetchData = async () => {
      let genderSearched = "all";
      if (
        (data.sexualOrientation === "straight" && data.gender === "male") ||
        (data.sexualOrientation === "gay" && data.gender === "female")
      ) {
        genderSearched = "female";
      } else if (
        (data.sexualOrientation === "straight" && data.gender === "female") ||
        (data.sexualOrientation === "gay" && data.gender === "male")
      ) {
        genderSearched = "female";
      }
      const result = await axios(
        `http://localhost:9000/api/getusers/withhobbies?uuidSource=${data.uuid}&genderSearched=${genderSearched}`
      );
      await setUsers(result.data);
    };
    fetchData();
  }, [data.uuid, data.gender, data.sexualOrientation]);

  // console.log('users', users)
  return (
    <UsersContext.Provider value={[usersValue, filtersValue]}>
      {props.children}
    </UsersContext.Provider>
  );
};
