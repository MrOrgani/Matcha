import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./NavBar.css";
import MenuItem from "@material-ui/core/MenuItem";
import DrawerNavigator from "./../Navbar/DrawerNavigation";
// import socketIOClient from "socket.io-client";

// if (user connecte  --> connect) {
//   et ensuite les autres composants se connectent
// }

// socket.on("refreshingData", _ => {
//   console.log("connection on frontend");
//   const login = JSON.parse(sessionStorage.data).login;
//   // console.log(login);
//   if (login) socket.emit("login", login);
// });

const useStyles = makeStyles(theme => ({
  bar: {
    // background: "transparent",
    boxShadow: "none",
    textAlign: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none"
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
  // SOCKET MANAGEMENT
  // const [socket, setSocket] = React.useState({});

  // if (sessionStorage.data) {
  //   const endpoint = "http://localhost:9000";
  //   const session = JSON.parse(sessionStorage.data);
  //   setSocket(
  //     socketIOClient.connect(endpoint, {
  //       transports: ["polling"],
  //       requestTimeout: 5000,
  //       upgrade: false,
  //       query: {
  //         // token: this.state.userToken
  //         // userID: this.state.userID,
  //         login: session.login
  //         // room_id: this.state.room_id
  //       }
  //     })
  //   );
  //   console.log(socket);
  // }
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <DrawerNavigator />
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Menu"
          > */}
          {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Matcha
          </Typography>
          <MenuItem>
            <Link className={classes.text} to="/signIn">
              <p>Sign In</p>
            </Link>
          </MenuItem>
          {/* <Button>Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
