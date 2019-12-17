import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import handleUsers from "./handleUsers/handleUsers";
import Chat from "./Chat/Chat";
import Navbar from "./../Components/Navbar/NavBar";
import Oauth from "./Oauth/Oauth";
import Confirm from "./Confirm/Confirmation";
import Reset from "./Forgot/Reset";
import SecureRoute from "../SecureRoute";
import Notifications from "react-notify-toast";

const Routes = () => {
  return (
    <Router>
      <Notifications />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Oauth" component={Oauth} />
        <Route path="/api/user/confirm/:id" component={Confirm} />
        <Route path="/api/user/reset/:id" component={Reset} />
        <SecureRoute
          path="/Search"
          component={Search}
          conditions={["isComplete", "isConfirmed"]}
        />
        <SecureRoute
          path="/Profile"
          component={Profile}
          conditions={["isConfirmed"]}
        />
        <SecureRoute
          path="/Chat"
          component={Chat}
          conditions={["isComplete", "isConfirmed"]}
        />
        <Route path="/handleUsers" component={handleUsers} />
      </Switch>
    </Router>
  );
};

export default Routes;
