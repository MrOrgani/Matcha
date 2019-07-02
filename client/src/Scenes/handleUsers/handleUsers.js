import React from "react";
import Generate from "./Components/Generate";
import Delete from "./Components/Delete.js";

function handleUsers() {
  return (
    <div>
      <Generate />
      <Delete />
    </div>
  );
}

export default handleUsers;
