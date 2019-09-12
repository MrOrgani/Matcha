import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

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

  const data = JSON.parse(sessionStorage.getItem("data"));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:9000/api/getusers/withhobbies?uuidSource=${data.uuid}`
      );
      console.log("User with hobbies", result.data);
      await setUsers(result.data);
    };
    fetchData();
  }, [data.uuid]);

  return (
    <UsersContext.Provider value={[usersValue, filtersValue]}>
      {props.children}
    </UsersContext.Provider>
  );
};
