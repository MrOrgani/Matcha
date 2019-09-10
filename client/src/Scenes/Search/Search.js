import React, { useState } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";

const Search = () => {
  const [gender, setGender] = useState("both");
  const [age, setAge] = useState([18, 100]);
  const [pop, setPop] = useState([50, 100]);

  const handleChange = (event, newValue) => {
    // console.log(event.currentTarget());
    // console.log(event.currentTarget.children[2]);
    // console.log(event.childNode);
    console.log("newValue", newValue);
    console.log("children", event.currentTarget.children);
    // console.log(event.currentTarget.childNode[2]);
    // console.log(event.target.parentNode);
    // console.log(newValue);
    // console.log(type);
    if (event.target && event.target.name === "gender")
      setGender(event.target.value);
    else {
      const target = [...event.currentTarget.children][2].name;
      console.log(target);
      if (target === "age") {
        setAge(newValue);
      } else if (target === "pop") {
        setPop(newValue);
      }
    }
  };

  return (
    <div>
      <UsersProvider>
        <div className="app">
          <Filters onChange={handleChange} value={[gender, age, pop]} />
          <UserList filters={[gender, age, pop]} />
        </div>
      </UsersProvider>
    </div>
  );
};

export default Search;
