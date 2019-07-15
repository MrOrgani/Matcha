import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import MenuButton from "./Components/MenuButton";
import { useCookies } from "react-cookie";

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
  const [cookies, removeCookies] = useCookies(["auth"]);
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

  // DISPLAYS DRAWERS LINK AND ICONS
  const iconsAndLinks = param => {
    const { text, link } = param;
    return (
      <ListItem button key={text}>
        <ListItemIcon>
          {text === "Home" && <HomeIcon />}
          {text === "Search" && <SearchIcon />}
          {text === "Disconnect" && <ClearIcon />}
          {(text === "Connect" || text === "My Account") && (
            <AccountCircleIcon />
          )}
        </ListItemIcon>
        <ListItemText>
          <Link
            to={link}
            className={classes.link}
            onClick={() => {
              text === "Disconnect" && removeCookies("auth");
            }}
          >
            {text}
          </Link>
        </ListItemText>
      </ListItem>
    );
  };

  // CHECKS IF USER IS AUTH IN COOKIES
  const menuItems = [{ text: "Home", link: "/" }];
  if (cookies.auth !== "undefined") {
    menuItems.push(
      { text: "My Account", link: "/signIn" },
      { text: "Search", link: "/Search" },
      { text: "Disconnect", link: "/" }
    );
  } else {
    menuItems.push({ text: "Connect", link: "/signIn" });
  }

  const sideList = side => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>{menuItems.map(iconsAndLinks)}</List>
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
  };

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
