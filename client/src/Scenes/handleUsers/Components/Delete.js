import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Delete() {
  function deleteUsers() {
    axios.delete("http://localhost:9000/api/user/");
  }
  return (
    <Button onClick={deleteUsers} type="submit">
      Delete
    </Button>
  );
}

export default Delete;
