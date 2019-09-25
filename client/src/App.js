import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Scenes/Home/Home";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import handleUsers from "./Scenes/handleUsers/handleUsers";
import Chat from "./Scenes/Chat/Chat";
import Navbar from "./Components/Navbar/NavBar";
import Oauth from "./Scenes/Oauth/Oauth";
import Confirm from "./Scenes/Confirm/Confirmation";
import Reset from "./Scenes/Forgot/Reset";
import { AuthProvider } from "./AuthContext";
import SecureRoute from "./SecureRoute";
import Notifications from "react-notify-toast";

export function App() {
  return (
    <AuthProvider>
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
          <Route
            path="/handleUsers"
            component={handleUsers}
            conditions={["isComplete", "isConfirmed"]}
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
