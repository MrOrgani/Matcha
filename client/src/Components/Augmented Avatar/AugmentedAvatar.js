import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import Avatar from "@material-ui/core/Avatar";
import "./AugmentedAvatar.css";

const AugmentedAvatar = props => {
  const [socketContext] = useContext(AuthContext);

  return (
    <div className="frame">
      <Avatar src={props.src} className="under"></Avatar>
      <span className="dot over" />
    </div>
  );
};

export default AugmentedAvatar;
