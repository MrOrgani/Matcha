import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import NotificationBell from "../NotificationBell/NotificationBell";
import "./NavBar.css";
import ConnectButton from "../Links/ConnectButton/ConnectButton";
import DiscoButton from "../Links/DiscoButton";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigation";
import { AuthContext } from "../../AuthContext";
import LSearch from "../Links/LSearch";
import Oauth from "../Links/Oauth";
import LProfile from "../Links/LProfile";
import LChat from "../Links/LChat";

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
                <NotificationBell />
                <DiscoButton />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Oauth />
                <ConnectButton />
              </React.Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
