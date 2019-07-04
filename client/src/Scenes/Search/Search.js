import React from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import NavBar from "../../Components/Navbar/NavBar";
import DrawerNavigator from "../../Components/Navbar/DrawerNavigation";

const Search = () => {
  return (
    <div>
      <DrawerNavigator />

      <UsersProvider>
        {/* <NavBar colorStyle="transparent" /> */}
        <div className="app">
          <UserList />
        </div>
      </UsersProvider>
    </div>
  );
};

export default Search;
