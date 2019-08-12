import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./NavBar.css";
import MenuItem from "@material-ui/core/MenuItem";
import DrawerNavigator from "./../Navbar/DrawerNavigation";

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

function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <DrawerNavigator />
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          <MenuItem>
            {/* <Link className={classes.text} to="/signIn">
              <p>Sign In</p>
            </Link> */}
          </MenuItem>
          {/* <Button>Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
