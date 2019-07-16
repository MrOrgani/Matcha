import React, { useState, 
  // createContext, useEffect 
} from "react";

import UserList from "./Components/UserList";
import "./public/stylesheet/style.css";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import NavBar from "../../Components/Navbar/NavBar";
// import DrawerNavigator from "../../Components/Navbar/DrawerNavigation";

import { UsersProvider } from "./Components/UsersContext";
import Filters from "./Components/Filters"
// import { TablePagination } from "@material-ui/core";

const Search = () => {
  const [gender, setGender] = useState('both')
  const [age, setAge] = useState([18, 100])

  function handleChangeFilters(event, newValue) {
      // console.log('event', event.target)

    if (event.target.name === 'gender')
      setGender(event.target.value)
    // if (event.target.name === 'age'
    else {
    // aria-labelledby="range-slider"
    // ){
      // console.log('new value is ', newValue)
      setAge(newValue)
      // console.log(age)
    }
  }

  // const handleChange = (event, newValue) => {
  //   setAge(newValue);
  // };

  return (
      <UsersProvider>
        <div className="app">
          <Filters onChange={handleChangeFilters} value={[gender, age]}/>
          <UserList filters={[gender, age]}/>
        </div>
      </UsersProvider>
  );
};

export default Search;
