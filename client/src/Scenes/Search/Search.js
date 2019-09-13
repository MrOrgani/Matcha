import React, { useState, useEffect } from "react";
import UserList from "./Components/UserList";
import { UsersProvider } from "./Components/UsersContext";
import "./public/stylesheet/style.css";
import Filters from "./Components/Filters";
import axios from "axios";
import Notifications from "react-notify-toast";

const Search = () => {
  const [state, setState] = useState({
    lat: "",
    lon: ""
  });
  const data = JSON.parse(sessionStorage.getItem("data"));

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
      // console.log(
      //   `%c Got User location: ${userData.data.location}`,
      //   "color: green; font-size: 16px"
      // );
      sessionStorage.setItem("data", JSON.stringify(userData.data));
    }
    if (state.lat !== "") updateLocation();
  }, [state, data.uuid]);

  return (
    <div>
      <UsersProvider>
        <Notifications />
        <div className="app">
          <Filters />
          <UserList />
        </div>
      </UsersProvider>
    </div>
  );
};

export default Search;
