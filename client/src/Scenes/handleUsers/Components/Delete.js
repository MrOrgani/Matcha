import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Delete() {
  function deleteUsers() {
    axios.post(
      "http://localhost:9000/api/user/generate",
      {
        value: 0
      },
      {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  }
  return (
    <Button onClick={deleteUsers} type="submit">
      Delete
    </Button>
  );
}

export default Delete;
