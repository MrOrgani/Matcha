import React, { useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { FiltersContext } from "./FiltersContext";
import "../public/stylesheet/style.css";

const UserList = () => {
  const [users] = useContext(UsersContext);
  // const [filters] = useContext(FiltersContext);
  // console.log(FiltersContext);
  // users.map(user => console.log(user._fields[0].properties));
  return (
    <div className="container">
      {users.map((user, index) => (
        <User key={index} value={user._fields[0].properties} />
      ))}
    </div>
  );
};

export default UserList;
