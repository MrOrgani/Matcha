import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";

const Search = () => {
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);

  // function verifyUsertoken() {
  //   const token = sessionStorage.jwt;
  //   if (!token) {
  //     sessionStorage.data = null;
  //     window.location.href = "http://www.w3schools.com";
  //   }
  // }
  // verifyUsertoken();

  const handleChange = (event, newAge) => {
    if (event.target.name === "gender") setGender(event.target.value);
    else {
      setAge(newAge);
    }
  };

  return (
    <div>
      <UsersProvider>
        <div className="app">
          <Filters onChange={handleChange} value={[gender, age]} />
          <UserList filters={[gender, age]} />
        </div>
      </UsersProvider>
    </div>
  );
};

export default Search;
