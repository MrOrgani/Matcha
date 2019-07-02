import React, { useState, useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";

const UserList = () => {
  const [users, setUsers] = useContext(UsersContext);
  console.log(users);
  return (
    <div>
      {/* {users.map(user => (
        <User name={user.name} />
      ))} */}
      ok
    </div>
  );
};

export default UserList;
