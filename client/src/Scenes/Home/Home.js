import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import "./Home.css";
// import background from "./img/couple.jpeg";
// import Button from "@material-ui/core/Button";
// import Register from "../Home/Components/Register/Register";
// import Login from "../Home/Components/Login/Login";

function HomeHeader() {
  // const classes = useStyles();

  var images = [
    "https://media.giphy.com/media/26BRED0APH6fRa1sk/giphy.gif",
    "http://giphygifs.s3.amazonaws.com/media/6dS4pm53kOgtG/giphy.gif",
    "https://media.giphy.com/media/Zu6ZytLn1y42k/giphy.gif",
    "https://media.giphy.com/media/MuyRDf6pNhgqxAmLEz/giphy.gif",
    "https://media.giphy.com/media/3oKIPjuSKpXJtlm88M/giphy.gif"
  ];

  return (
    <div className="backg">
      {/* <div className="root"> */}
      {/* <DrawerNavigator /> */}
      <div className="tittleLove">
        <span>Let's find </span>love.
      </div>
      {/* <p>
        Life is an adventure which you must chose who you will share it with?
      </p> */}
      <div
        className="gifBox"
        style={{
          backgroundImage:
            "url(" + images[Math.floor(Math.random() * images.length)] + ")"
        }}
      >
        {/* <img src={images[Math.floor(Math.random() * images.length)]} /> */}
      </div>
      {/* <div className="buttonContainer">
        <Register />
        <Login />
      </div> */}
      {/* </div> */}
    </div>
    // <div style={{ textAlign: "center" }}>
    //   <div className="root">
    //     {/* <DrawerNavigator /> */}
    //     <h1 className="back">Are you ready for Love?</h1>
    //     <p>
    //       Life is an adventure which you must chose who you will share it with?
    //     </p>
    //     <div className="buttonContainer">
    //       <Register />
    //       <Login />
    //     </div>
    //   </div>
    // </div>
  );
}

export default HomeHeader;
