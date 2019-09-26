import React from "react";
import { UsersProvider } from "./Components/UsersContext";
import CompoContext from "./CompoContext";

const Search = () => {
  return (
    <div>
      <UsersProvider>
        <CompoContext />
      </UsersProvider>
    </div>
  );
};

export default Search;
