import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);
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
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
