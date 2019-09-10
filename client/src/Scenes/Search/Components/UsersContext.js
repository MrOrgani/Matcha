import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);
  const [pop, setPop] = useState([50, 100]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:9000/api/getusers/withhobbies"
      );
      console.log("User with hobbies", result.data);
      await setUsers(result.data);
    };
    fetchData();
  }, []);

  return (
    <UsersContext.Provider
      usersValue={[users, setUsers]}
      filterValues={[gender, setGender, age, setAge, pop, setPop]}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
