import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
// import Form from "./Components/Form";

function SignIn() {
  return (
    <div>
      <NavBar />
      <h1>Register page</h1>
      <Register />
      <Login />
      {/* <Form /> */}
    </div>
  );
}

export default SignIn;
