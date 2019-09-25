import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

function HomeHeader() {
  const [, authContext] = useContext(AuthContext);
  console.log('authcontext', authContext)

    const [state, setState] = useState({
      lat: "",
      lon: ""
    });
    const { data, setData } = authContext;

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
      setData(userData.data);
    }
    if (state.lat !== "" && data.uuid) updateLocation();
  }, [state, data.uuid, setData]);


  const images = [
    "https://media.giphy.com/media/26BRED0APH6fRa1sk/giphy.gif",
    "http://giphygifs.s3.amazonaws.com/media/6dS4pm53kOgtG/giphy.gif",
    "https://media.giphy.com/media/Zu6ZytLn1y42k/giphy.gif",
    "https://media.giphy.com/media/MuyRDf6pNhgqxAmLEz/giphy.gif",
    "https://media.giphy.com/media/3oKIPjuSKpXJtlm88M/giphy.gif"
  ];

  return (
    <div className="backg">
      <div className="tittleLove">
        <span>Let's find </span>love.
      </div>
      <div
        className="gifBox"
        style={{
          backgroundImage:
            "url(" + images[Math.floor(Math.random() * images.length)] + ")"
        }}
      >
      </div>
    </div>
  );
}

export default HomeHeader;
