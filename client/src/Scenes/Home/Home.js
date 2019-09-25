import React from "react";
import "./Home.css";

function HomeHeader() {
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
      ></div>
    </div>
  );
}

export default HomeHeader;
