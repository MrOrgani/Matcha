import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import Register from "../Home/Components/Register/Register";
import Login from "../Home/Components/Login/Login";
import "./signin.css";
// import Form from "./Components/Form";
import DrawerNavigator from "../../Components/Navbar/DrawerNavigation";
import { Drawer } from "@material-ui/core";

function SignIn() {
  return (
    <div>
      <DrawerNavigator />
      <h1>Register page</h1>
      <div className="container">
        <Register />
        <Login />
      </div>
      {/* <Form /> */}
    </div>
  );
}

export default SignIn;
