import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./NavBar.css";
import MenuItem from "@material-ui/core/MenuItem";
// import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  bar: {
    background: "transparent",
    boxShadow: "none",
    textAlign: "center"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "black"
  },
  text: {
    color: "black",
    display: "flex"
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          <MenuItem>
            <Link to="/signIn">
              <p className={classes.text}>Sign In</p>
            </Link>
          </MenuItem>
          {/* <Button>Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
