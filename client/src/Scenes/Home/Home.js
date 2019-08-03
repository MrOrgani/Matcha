import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
import background from "./img/couple.jpeg";
// import Button from "@material-ui/core/Button";
import Register from "../Home/Components/Register/Register";
import Login from "../Home/Components/Login/Login";

function HomeHeader() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      overflow: "hidden",
      height: "100vh",
      backgroundPosition: "50% 50%"
    },
    back: {
      marginTop: "80px"
    }
  }));

  const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      <div className={classes.root}>
        {/* <DrawerNavigator /> */}
        <h1 className={classes.back}>Are you ready for Love?</h1>
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
