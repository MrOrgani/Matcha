import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";

const Search = () => {
  return (
    <UsersProvider>
      <div className="app">
        <UserList />
      </div>
    </UsersProvider>
  );
};

export default Search;
