import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Form from "./form/FormContainer";
// import SignInInside from "./signinExample";
import Home from "./Scenes/Home/Home";
import SignIn from "./Scenes/SignIn/SignIn";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import handleUsers from "./Scenes/handleUsers/handleUsers";

import Navbar from "./Components/Navbar/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Search" component={Search} />
        <Route path="/Profile" component={Profile} />
        <Route path="/handleUsers" component={handleUsers} />
      </Switch>
    </Router>
  );
}

export default App;
