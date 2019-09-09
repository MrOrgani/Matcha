import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import NotificationBell from "./Components/NotificationBell/NotificationBell";
import "./NavBar.css";
import ConnectButton from "./Components/Links/ConnectButton/ConnectButton";
import DiscoButton from "./Components/Links/DiscoButton";
import DrawerNavigator from "./Components/DrawerNavigation/DrawerNavigation";
import { AuthContext } from "../../AuthContext";
import LSearch from "./Components/Links/LSearch";
import LProfile from "./Components/Links/LProfile";
import LChat from "./Components/Links/LChat";

function NavBar() {
  const [, authContext] = useContext(AuthContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bar">
          {authContext.isAuth ? <DrawerNavigator /> : null}
          <div className="tittleBar">
            <Link to="/" className="tittleBar">
              Matcha
            </Link>
          </div>
          <div className="menuItems">
            {authContext.isAuth ? (
              <React.Fragment>
                <LSearch />
                <LProfile />
                <LChat />
                {/* <NotificationBell /> */}
                <DiscoButton />
              </React.Fragment>
            ) : (
              <ConnectButton />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
