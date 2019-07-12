import React, { useState, useContext } from "react";
import User from "./User";
import { UsersContext } from "./UsersContext";
// import { FiltersContext } from "./FiltersContext";

import "../public/stylesheet/style.css";

const UserList = (props) => {
  const [users, setUsers] = useContext(UsersContext);

  // console.log('here', props.filters[0]);
   const filtered = (!props.filters[0] || props.filters[0] === 'both') ? users : users.filter(user => 
    user._fields[0].properties.gender === props.filters[0])

  return (
    <div className="container">
     {filtered.map((user, index) => (
        <User key={index} value={user._fields[0].properties} />
      ))}
    </div>
  );
};

export default UserList;
