import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
import background from "./img/couple.jpeg";
// import Button from "@material-ui/core/Button";
import Register from "../Home/Components/Register/Register";
import Login from "../Home/Components/Login/Login";

function HomeHeader() {
  // const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      <div className="root">
        {/* <DrawerNavigator /> */}
        <h1 className="back">Are you ready for Love?</h1>
        <p>
          Life is an adventure which you must chose who you will share it with?
        </p>
        <div className="buttonContainer">
          <Register />
          <Login />
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
