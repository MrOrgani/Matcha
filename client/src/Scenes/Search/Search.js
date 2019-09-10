import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";

const Search = () => {
  return (
    <div>
      <UsersProvider>
        <div className="app">
          <Filters />
          <UserList />
        </div>
      </UsersProvider>
    </div>
  );
};

export default Search;
