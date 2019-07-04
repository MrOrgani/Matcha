import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:9000/api/user");
      setUsers(result.data.records);
    };
    fetchData();
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {props.children}
    </UsersContext.Provider>
  );
};
