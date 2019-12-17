import React from "react";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";

export default function LChat() {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
      config={{ delay: 1000 }}
    >
      {props => (
        <div style={props}>
          <Link to="/Chat" className="link">
            CHAT
          </Link>
        </div>
      )}
    </Spring>
  );
}
