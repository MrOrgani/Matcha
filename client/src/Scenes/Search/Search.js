import React, { useState } from "react";
import UserList from "./Components/UserList";
import "./public/stylesheet/style.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import NavBar from "../../Components/Navbar/NavBar";
import DrawerNavigator from "../../Components/Navbar/DrawerNavigation";

import { UsersProvider } from "./Components/UsersContext";
import { FiltersProvider } from "./Components/FiltersContext"
import Filters from "./Components/Filters"
import { TablePagination } from "@material-ui/core";

const Search = () => {
  const [gender, setGender] = useState('both')
  const [age, setAge] = useState([18, 100])

  function handleChangeFilters(event) {
    // setGender(event.target.value);
    console.log('change', event.target)
  }

  // const handleChange = (event, newValue) => {
  //   setAge(newValue);
  // };

  return (
      <UsersProvider>
        {/* <FiltersProvider> */}
        <div className="app">
          <Filters onChange={handleChangeFilters} value={[gender, age]}/>
          <UserList filters={[gender, age]}/>
        </div>
        {/* </FiltersProvider> */}
      </UsersProvider>
  );
};

export default Search;
