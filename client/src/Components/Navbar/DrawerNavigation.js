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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

import { FiltersProvider } from "./../../Scenes/Search/Components/FiltersContext";
import MenuButton from "./Components/MenuButton";
import RangeSlider from "./Components/RangeSlider";
// import { grey } from "@material-ui/core/colors";

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
    // opacity: 0.54
    // color: "black"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  const [values, setValues] = React.useState([30, 40]);
  const range = [18, 100];
  const path = window.location.pathname;

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className={classes.top}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CloseIcon onClick={toggleDrawer(side, false)} />
            </ListItemIcon>{" "}
            <ListItemText>Matcha</ListItemText>
          </ListItem>
        </List>
      </div>
      <List>
        {["Home", "Connect", "Search"].map(text => (
          <div key={text}>
            {text === "Home" && (
              <Link to="/" className={classes.link}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>{" "}
                </ListItem>
              </Link>
            )}
            {text === "Search" && (
              <Link to="/Search" className={classes.link}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>{" "}
                </ListItem>
              </Link>
            )}
            {text === "Connect" && (
              <Link to="/signIn" className={classes.link}>
                <ListItem button key={text}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>{" "}
                </ListItem>
              </Link>
            )}
          </div>
        ))}
      </List>
      <Divider />
      {path === "/Search" && (
        <div>
          <ListItemText>Age</ListItemText>
          <RangeSlider
            value={values}
            onChange={handleChange}
            min={range[0]}
            max={range[1]}
          />
          <FiltersProvider value={values} />
          <ListItemText>Gender</ListItemText>
          <ListItemText>Distance</ListItemText>
          <Divider />
        </div>
      )}
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
      <Drawer
        open={state.left}
        // onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
}
