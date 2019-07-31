import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
// import { socket } from "../../../Components/Navbar/NavBar";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    opacity: 0.54,
    color: "black"
  }
});

// DISPLAYS DRAWERS LINK AND ICONS
function InconsAndLinks({ param }) {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const { text, link } = param;

  function disconnect() {
    // sessionStorage.removeItem("data");
    authContext.setData();
    authContext.setIsAuth(0);
    // socket.emit("logOut");
    // socket.disconnect();
  }

  return (
    <Link
      to={link}
      className={classes.link}
      onClick={() => {
        text === "Disconnect" && disconnect();
      }}
    >
      <ListItem button>
        {text === "Home" && (
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
        )}
        {text === "Search" && (
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
        )}
        {text === "Disconnect" && (
          <ListItemIcon>
            <ClearIcon />
          </ListItemIcon>
        )}
        {(text === "Connect" || text === "My Account") && (
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
        )}
        <ListItemText>{text}</ListItemText>
      </ListItem>
    </Link>
  );
}

export default InconsAndLinks;
