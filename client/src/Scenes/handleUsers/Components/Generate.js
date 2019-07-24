import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Generate = () => {
  function createUsers() {
    axios.head("http://localhost:9000/api/user/");
  }
  return (
    <Button onClick={createUsers} type="submit">
      Generate
    </Button>
  );
};

export default Generate;
