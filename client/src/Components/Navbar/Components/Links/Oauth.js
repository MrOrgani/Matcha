import React from "react";
import { Button } from "@material-ui/core";

export default function Oauth() {
  return (
    <div>
      <Button className="Oauth42" href="http://localhost:9000/api/Oauth/42">
        connect to 42
      </Button>
    </div>
  );
}
