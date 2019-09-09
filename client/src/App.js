import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Scenes/Home/Home";
// import Login from "./Scenes/Login/Login";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import Social from "./Scenes/Social/Social";
import handleUsers from "./Scenes/handleUsers/handleUsers";
import Chat from "./Scenes/Chat/Chat";
import Navbar from "./Components/Navbar/NavBar";
import Confirm from "./Scenes/Confirm/Confirmation";
import Reset from "./Scenes/Forgot/Reset";
import { AuthProvider } from "./AuthContext";
import SecureRoute from "./SecureRoute";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/api/user/confirm/:id" component={Confirm} />
          <Route path="/api/user/reset/:id" component={Reset} />
          {/* <Route path="/Login" component={Login} /> */}
          <SecureRoute path="/Search" component={Search} />
          <SecureRoute path="/Profile" component={Profile} />
          <SecureRoute path="/Social" component={Social} />
          <SecureRoute path="/Chat" component={Chat} />
          <Route path="/handleUsers" component={handleUsers} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// export App;
