import React from "react";
import "./Home.css";

function HomeHeader() {
  const images = [require("./img/giphy1.gif"), require("./img/giphy2.gif")];

  return (
    <div className="backg">
      <div className="tittleLove">
        <span>Let's find </span>love.
      </div>
      <img
        className="gifBox"
        src={images[Math.floor(Math.random() * images.length)]}
        alt="coucou"
      />
    </div>
  );
}

export default HomeHeader;
