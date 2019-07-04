import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import MenuButton from "./Components/MenuButton";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  icon: {
    display: "flex"
  },
  link: {
    textDecoration: "none",
    opacity: 0.54,
    color: "black"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Home", "Connect", "Search"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === "Home" && <HomeIcon />}
              {text === "Search" && <SearchIcon />}
              {text === "Connect" && <AccountCircleIcon />}
            </ListItemIcon>
            <ListItemText>
              {text === "Home" && (
                <Link to="/" className={classes.link}>
                  {text}
                </Link>
              )}
              {text === "Search" && (
                <Link to="/Search" className={classes.link}>
                  {text}
                </Link>
              )}
              {text === "Connect" && (
                <Link to="/signIn" className={classes.link}>
                  {text}
                </Link>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["About us"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <div onClick={toggleDrawer("left", true)} className={classes.icon}>
        <MenuButton />
      </div>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
