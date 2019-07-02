import React, { useState, createContext } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = props => {
  const [users, setUsers] = useState("");

  axios
    .get("http://localhost:9000/api/user")
    .then(data => setUsers(data.data.records))
    .finally(console.log(users));

  return <UsersContext.Provider>{props.children}</UsersContext.Provider>;
};
