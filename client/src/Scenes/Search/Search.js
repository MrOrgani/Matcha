import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import axios from "axios";
// import { FiltersProvider } from "./Components/FiltersContext";
import "./public/stylesheet/style.css";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import NavBar from "../../Components/Navbar/NavBar";
// import DrawerNavigator from "../../Components/Navbar/DrawerNavigation";
import Filters from "./Components/Filters";

const Search = () => {
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);

  const handleChange = (event, newAge) => {
    if (event.target.name === "gender") setGender(event.target.value);
    else {
      setAge(newAge);
    }
    // console.log(event);
  };

  console.log(axios("http://localhost:9000/"));

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
