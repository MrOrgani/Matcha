import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import NotificationBell from "./Components/NotificationBell/NotificationBell";
import Typography from "@material-ui/core/Typography";
import "./NavBar.css";
import ConnectButton from "./Components/ConnectButton/ConnectButton";
import MenuItem from "@material-ui/core/MenuItem";
import DrawerNavigator from "./Components/DrawerNavigation/DrawerNavigation";
import { AuthContext } from "../../AuthContext";

// function NavBar() {
//   // const classes = useStyles();
//   const [, authContext] = useContext(AuthContext);

//   return (
//     <div>
//       <AppBar position="static" className={classes.bar}>
//         <Toolbar>
//           {authContext.isAuth ? <DrawerNavigator /> : null}
//           <Typography variant="h6" className={classes.title}>
//             Matcha
//           </Typography>
//           <MenuItem>
//             {authContext.isAuth ? <NotificationBell /> : null}
//           </MenuItem>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

function NavBar() {
  // const classes = useStyles();
  const [, authContext] = useContext(AuthContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bar">
          {authContext.isAuth ? <DrawerNavigator /> : null}
          <div className="tittleBar">
            <Link to="/" className="link">
              Matcha
            </Link>
          </div>
          {/* <MenuItem> */}
          <div className="menuItems">
            {authContext.isAuth ? (
              <React.Fragment>
                <Link to="/Search" className="link">
                  Search
                </Link>
                <Link to="/Profile" className="link">
                  Profile
                </Link>
                <Link to="/TempChat" className="link">
                  Chat
                </Link>
                <NotificationBell />
              </React.Fragment>
            ) : null}
            {/* GERER LE DISPLAY DE CONNECT BUTTON EN FONCTION DE AUTH */}
            {authContext.isAuth ? <ConnectButton className="loginBut" /> : null}
            {/* </MenuItem> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
