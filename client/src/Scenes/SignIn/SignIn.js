import React from "react";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import "./signin.css";
// import Form from "./Components/Form";

function SignIn() {
  return (
    <div>
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
