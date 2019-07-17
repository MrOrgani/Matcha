import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:9000/");
      console.log("results users", result.data.records);

      await setUsers(result.data);
    };
    fetchData();
  }, []);

  console.log("data in users context", users);
  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
