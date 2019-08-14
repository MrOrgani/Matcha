import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationBell from "./Components/NotificationBell/NotificationBell";
import Typography from "@material-ui/core/Typography";
import "./NavBar.css";
import MenuItem from "@material-ui/core/MenuItem";
import DrawerNavigator from "./Components/DrawerNavigation/DrawerNavigation";
import { AuthContext } from "../../AuthContext";

function NavBar() {
  const classes = useStyles();
  const [, authContext] = useContext(AuthContext);

  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          {authContext.isAuth ? <DrawerNavigator /> : null}
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          <MenuItem>
            {authContext.isAuth ? <NotificationBell /> : null}
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  bar: {
    // background: "transparent",
    boxShadow: "none",
    textAlign: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    height: "7vh",
    minHeight: "64px"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  text: {
    color: "white",
    display: "flex",
    textDecoration: "none"
  }
}));

export default NavBar;
