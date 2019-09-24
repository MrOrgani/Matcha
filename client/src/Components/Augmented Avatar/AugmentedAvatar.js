import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import Avatar from "@material-ui/core/Avatar";
import "./AugmentedAvatar.css";

const AugmentedAvatar = props => {
  const [socketContext] = useContext(AuthContext);
  const [dot, setDot] = useState("redDot");

  useEffect(() => {
    setDot(
      socketContext.connectedUsrs.includes(props.targetUuid)
        ? "greenDot"
        : "redDot"
    );
    socketContext.socket.on("newConnection", connectedUsrs => {
      setDot(connectedUsrs.includes(props.targetUuid) ? "greenDot" : "redDot");
    });
    return () => socketContext.socket.off("newConnection");
  }, [socketContext, dot, props.targetUuid]);

  return (
    <div className="frame">
      <Avatar src={props.src} className="under"></Avatar>
      <span className={`${dot} over`} />
    </div>
  );
};

export default AugmentedAvatar;
