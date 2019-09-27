import React, { useContext, useEffect, useState } from "react";
// import Card from "@material-ui/core/Card";
import { UserCardContext } from "./../../../../Components/UserCards/UserCardContext";
import "./../../../../Components/UserCards/UserCard.css";
import { AuthContext } from "../../../../AuthContext";
import axios from "axios";

export default function UserCardMatch({ zIndex = 0 }) {
  const [, , , , userInfo] = useContext(UserCardContext);
  const [socketContext, authContext] = useContext(AuthContext);

  socketContext.socket.emit("newNotif", {
    uuidSource: authContext.data.uuid,
    targetUuid: userInfo.uuid,
    jwt: authContext.data.jwt,
    type: "visited"
  });
  axios.post("http://localhost:9000/api/rel/visit", {
    jwt: authContext.data.jwt,
    uuidSource: authContext.data.uuid,
    target: userInfo.uuid
  });

  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [state, setState] = useState({
    index: 0,
    pics: []
  });

  const changePic = dir => {
    if (dir === "left") {
      if (state.pics[state.index - 1]) {
        setState({ ...state, index: state.index - 1 });
      }
    }
    if (dir === "right") {
      if (state.pics[state.index + 1]) {
        setState({ ...state, index: state.index + 1 });
      }
    }
  };

  useEffect(() => setState({ ...state, pics: userInfo.pics }), [
    userInfo.pics
    // state
  ]);

  return (
    <React.Fragment>
      <div
        className="mainCard"
        style={{ backgroundImage: `url('${state.pics[state.index]}')` }}
      >
        <div className="userName">
          {capFLtr(userInfo.firstName)} {userInfo.lastName[0]}.
        </div>
        <div className="arrows">
          <span role="img" aria-label="left" onClick={() => changePic("left")}>
            ◀️
          </span>
          <span
            role="img"
            aria-label="right"
            onClick={() => changePic("right")}
          >
            ▶️
          </span>
        </div>
        <div className="showHim">
          <div className="backRect">
            <div style={{ height: "40px" }}>
              {userInfo.age}, {userInfo.city}.
            </div>
            <div style={{ height: "40px" }}>
              <span role="img" aria-label="trophy">
                🏆
              </span>{" "}
              {userInfo.score}
            </div>
          </div>
          <div className="whiteRect">
            <div className="userBio">
              {userInfo.bio}
              <div>
                {userInfo.hobbies.map((hobby, index) => (
                  <div key={hobby + index} className="tag">
                    <label>{hobby}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
