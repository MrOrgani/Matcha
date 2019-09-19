import React, { useState, useContext, useEffect } from "react";
import UserList from "./UserList";
// import { UsersProvider } from "./Components/UsersContext";
import "../public/stylesheet/style.css";
import Filters from "./Filters";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";
import UserMap from "./UserMap";
import UserMatch from "./UserMatch";
import { UsersContext } from "./UsersContext";

export default function CompoContext() {
  const [, authContext] = useContext(AuthContext);
  const [state, setState] = useState({
    lat: "",
    lon: ""
  });
  const [map, setMap] = useState(false);
  //   const [fire, setFire] = useState(false);
  const { data } = authContext;
  const [usersValue, filtersValue] = useContext(UsersContext);

  if (!data.isComplete) window.location = "/Profile";

  console.log("uservalues in CompoContext", usersValue);
  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition(
        position => {
          setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        async () => {
          const api = await fetch("https://ipapi.co/json");
          const api_json = await api.json();
          setState({
            lat: api_json.latitude,
            lon: api_json.longitude
          });
        }
      ),
    []
  );

  useEffect(() => {
    async function updateLocation() {
      const userData = await axios
        .put(
          `http://localhost:9000/api/user/profile?uuidSource=${data.uuid}`,
          state
        )
        .catch(err => console.log(err));
      authContext.setData(userData.data);
    }
    if (state.lat !== "") updateLocation();
  }, [state, data.uuid]);

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
