import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Generate() {
  function createUsers() {
    axios.post(
      "http://localhost:9000/api/user/generate",
      {
        value: 1
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
    <Button onClick={createUsers} type="submit">
      Generate
    </Button>
  );
}

export default Generate;
