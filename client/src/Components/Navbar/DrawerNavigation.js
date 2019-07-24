import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconsAndLinks from "./Components/IconsAndLinks";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

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

  // CHECKS IF USER IS AUTH
  const menuItems = [{ text: "Home", link: "/" }];
  if (sessionStorage.data) {
    menuItems.push(
      { text: "My Account", link: "/Profile" },
      { text: "Search", link: "/Search" },
      { text: "Disconnect", link: "/" } // Disconnect process happens in Icons and Links
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
        <div className={classes.top}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CloseIcon onClick={toggleDrawer(side, false)} />
              </ListItemIcon>{" "}
              <ListItemText>Menu</ListItemText>
            </ListItem>
          </List>
        </div>
        <List>
          {menuItems.map(menuItem => (
            <IconsAndLinks key={menuItem.text} param={menuItem} />
          ))}
          <Divider />
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
        <MenuIcon />
      </div>
      <Drawer
        open={state.left}
        // onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
}

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
  },
  top: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    color: "white"
  }
});
