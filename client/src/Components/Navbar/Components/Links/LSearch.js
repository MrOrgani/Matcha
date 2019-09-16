import React from "react";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";
import "../NotificationBell/NotificationBell.css";

export default function LSearch() {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {props => (
        <div style={props}>
          <Link to="/Search" className="link">
            SEARCH
          </Link>
        </div>
      )}
    </Spring>
  );
}
