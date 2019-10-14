import React, { useContext } from "react";
import { UsersProvider } from "./Components/UsersContext";
import CompoContext from "./CompoContext";
import { AuthContext } from "../../AuthContext";

const Search = () => {
  const [, authContext] = useContext(AuthContext);

  if (!authContext.data.isComplete) return (window.location = "/Profile");
  return (
    <div>
      <UsersProvider>
        <CompoContext />
      </UsersProvider>
    </div>
  );
};

export default Search;
