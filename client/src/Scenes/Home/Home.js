import NavBar from "../../Components/Navbar/NavBar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
import background from "./img/header.jpg";
import Button from "@material-ui/core/Button";

function HomeHeader() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      overflow: "hidden",
      height: "350px"
    },
    back: {
      marginTop: "80px"
    },
    button: {
      top: "-20px"
    }
  }));

  const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      <div className={classes.root}>
        <NavBar colorStyle="transparent" />
        <h1 className={classes.back}>
          Qui allez vous rencontrer aujourd'hui ?
        </h1>
      </div>
      <Button className={classes.button}>test</Button>
    </div>
  );
}

export default HomeHeader;
