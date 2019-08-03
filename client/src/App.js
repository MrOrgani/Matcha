import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Scenes/Home/Home";
import SignIn from "./Scenes/SignIn/SignIn";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import Social from "./Scenes/Social/Social";
import handleUsers from "./Scenes/handleUsers/handleUsers";
import TempChat from "./Scenes/TempChat/TempChat";
import Navbar from "./Components/Navbar/NavBar";
import { AuthProvider } from "./AuthContext";
import SecureRoute from "./SecureRoute";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <SecureRoute path="/SignIn" component={SignIn} />
          <SecureRoute path="/Search" component={Search} />
          <SecureRoute path="/Profile" component={Profile} />
          <SecureRoute path="/Social" component={Social} />
          <SecureRoute path="/TempChat" component={TempChat} />
          <Route path="/handleUsers" component={handleUsers} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// export App;
