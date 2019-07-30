import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Scenes/Home/Home";
import SignIn from "./Scenes/SignIn/SignIn";
import Search from "./Scenes/Search/Search";
import Profile from "./Scenes/Profile/Profile";
import Social from "./Scenes/Social/Social";
import handleUsers from "./Scenes/handleUsers/handleUsers";
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
          <Route path="/SignIn" component={SignIn} />
          <SecureRoute path="/Search" component={Search} />
          {/* <Route
            path="/Search"
            render={_ => <AuthRequired redirectTo="/" orRender={<Search />} />}
          /> */}
          <Route path="/Profile" component={Profile} />
          <Route path="/Social" component={Social} />
          <SecureRoute path="/handleUsers" component={handleUsers} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// export App;
