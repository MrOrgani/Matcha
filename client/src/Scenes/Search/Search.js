import React, { useState, useContext, useEffect } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";
import axios from "axios";
import Notifications from "react-notify-toast";
import { AuthContext } from "../../AuthContext";
import UserMap from "./Components/UserMap";

const Search = () => {
  const [, authContext] = useContext(AuthContext);
  const [state, setState] = useState({
    lat: "",
    lon: ""
  });
  const [map, setMap] = useState(false);
  const data = authContext.data;
  if (!data.isComplete) window.location = "/Profile";

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
      sessionStorage.setItem("data", JSON.stringify(userData.data));
    }
    if (state.lat !== "") updateLocation();
  }, [state, data.uuid]);

  function handleClick() {
    setMap(!map);
  }

  // console.log("map", map);

  return (
    <div>
      <UsersProvider>
        <Notifications />
        <div style={{ display: "flex" }}>
          <Filters onClick={handleClick} map={map} />
        </div>
        {map ? <UserMap /> : <UserList />}
      </UsersProvider>
    </div>
  );
};

export default Search;
