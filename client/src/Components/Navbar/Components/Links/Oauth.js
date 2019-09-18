import React from "react";
import { Button } from "@material-ui/core";
import "../../NavBar.css";

export default function Oauth() {
  return (
    <div className="duoQuadraButton">
      <Button
        className="Oauth42"
        href="http://localhost:9000/api/Oauth/42"
        style={{ color: "white" }}
      >
        42
      </Button>
    </div>
  );
}
