import React, { useState, useEffect } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";
import axios from "axios";
import Notifications from "react-notify-toast";
// import { AuthContext } from "../../AuthContext";
import UserMap from "./Components/UserMap";
import UserMatch from "./Components/UserMatch";

const Search = () => {
  const [state, setState] = useState({
    lat: "",
    lon: ""
  });
  const [map, setMap] = useState(false);
  const [fire, setFire] = useState(true);

  const data = JSON.parse(sessionStorage.getItem("data"));
  // const [, authContext] = useContext(AuthContext)

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

  function handleClick(value) {
    if (value === "map") {
      setMap(!map);
      setFire(false);
    } else if (value === "fire") {
      setMap(false);
      setFire(!fire);
    }
  }

  // console.log("map", map);

  return (
    <div>
      <UsersProvider>
        <Notifications />
        <div style={{ display: "flex" }}>
          <Filters onClick={handleClick} map={map} />
        </div>
        {map && <UserMap />}
        {fire && <UserMatch />}
        {!fire && !map && <UserList />}
      </UsersProvider>
    </div>
  );
};

export default Search;
