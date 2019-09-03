import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { AuthContext } from "../../../../AuthContext";
import IconsAndLinks from "./IconsAndLinks";

export default function TemporaryDrawer() {
  const [, authContext] = useContext(AuthContext);
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

  const menuItems = [
    { text: "My Account", link: "/Profile" },
    { text: "Search", link: "/Search" },
    { text: "TempChat", link: "/TempChat" },
    { text: "Disconnect", link: "/" }
  ];

  //A CHECKER REACT CLICK AWAy LISTENER MATERIAL uI

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
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div style={{ display: authContext.isAuth === 1 ? "block" : "none" }}>
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
