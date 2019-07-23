import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Form from "./form/FormContainer";
// import SignInInside from "./signinExample";
import Home from "./Scenes/Home/Home";
import SignIn from "./Scenes/SignIn/SignIn";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import Social from "./Scenes/Social/Social";
import handleUsers from "./Scenes/handleUsers/handleUsers";
import socketIOClient from "socket.io-client";
import Navbar from "./Components/Navbar/NavBar";

const endpoint = "http://localhost:9000";

export const socket = socketIOClient.connect(endpoint);

export function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Search" component={Search} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Social" component={Social} />
        <Route path="/handleUsers" component={handleUsers} />
      </Switch>
    </Router>
  );
}

// export App;
