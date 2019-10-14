import React, { useState, useContext } from "react";
import UserList from "./Components/UserList";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";
import UserMap from "./Components/UserMap";
import UserMatch from "./Components/UserMatch";
import { UsersContext } from "./Components/UsersContext";

export default function CompoContext() {
  const [map, setMap] = useState(false);
  const [usersValue, filtersValue] = useContext(UsersContext);

  function handleClick(value) {
    if (value === "map") {
      setMap(!map);
      filtersValue.setFire(false);
    } else if (value === "fire") {
      usersValue.setMatchUsers([]);
      setMap(false);
      filtersValue.setFire(!filtersValue.fire);
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <Filters onClick={handleClick} map={map} fire={filtersValue.fire} />
      </div>
      {map && <UserMap />}
      {filtersValue.fire && <UserMatch />}
      {!filtersValue.fire && !map && <UserList />}
    </>
  );
}
