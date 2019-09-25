import React, { useState, useContext } from "react";
import UserList from "./UserList";
import "../public/stylesheet/style.css";
import Filters from "./Filters";

import UserMap from "./UserMap";
import UserMatch from "./UserMatch";
import { UsersContext } from "./UsersContext";
import { AuthContext } from "../../../AuthContext";

export default function CompoContext() {
  const [map, setMap] = useState(false);
  const [, authContext] = useContext(AuthContext);
  const { data } = authContext;

  const [usersValue, filtersValue] = useContext(UsersContext);
  if (!data.isComplete) window.location = "/Profile";

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
