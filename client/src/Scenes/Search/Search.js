import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";

const Search = () => {
  return (
    <div>
      <UsersProvider>
        <UserList />
      </UsersProvider>
    </div>
  );
};

export default Search;
