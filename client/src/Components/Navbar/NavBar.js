import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import "./NavBar.css";
// import MenuItem from "@material-ui/core/MenuItem";
import DrawerNavigator from "./Components/DrawerNavigation";
import ConnectButton from "./Components/ConnectButton/ConnectButton";
import { Link } from "react-router-dom";

// const useStyles = makeStyles(theme => ({
//   // bar: {
//   //   // background: "transparent",
//   //   boxShadow: "none",
//   //   textAlign: "center",
//   // background: "white",
//   //   textDecoration: "none",
//   //   minHeight: "64px"
//   // },
//   menuButton: {
//     marginRight: theme.spacing(2)
//   },
//   title: {
//     flexGrow: 1,
//     color: "white"
//   },
//   text: {
//     color: "white",
//     display: "flex",
//     textDecoration: "none"
//   }
// }));

function NavBar() {
  // const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bar">
          <DrawerNavigator />
          <div className="tittleBar">
            <Link to="/" className="link">
              Matcha
            </Link>
          </div>
          {/* <MenuItem> */}
          <ConnectButton className="loginBut" />
          {/* </MenuItem> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
