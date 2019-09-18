import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import { UserCardContext } from "./../../../../Components/UserCards/UserCardContext";
import "./../../../../Components/UserCards/UserCard.css";
import { AuthContext } from "../../../../AuthContext";
import axios from "axios";

export default function UserCardMatch({ zIndex = 0 }) {
  const [, , , , userInfo] = useContext(UserCardContext);
  const [socketContext, authContext] = useContext(AuthContext);

  const cardStyles = {
    background: "whitesmoke",
    borderRadius: 3,
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0
  };

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

  return (
    <React.Fragment>
      <Card style={{ ...cardStyles, zIndex }}>
        <div
          style={{
            backgroundImage: `url(${userInfo.pics[userInfo.indexOfPP]})`
          }}
          className="mainCard"
        >
          <div className="showHim">
            <div className="userName">
              {userInfo.firstName} {userInfo.lastName[0]}.
            </div>
            <div className="backRect">
              <div>
                {userInfo.age}, {userInfo.city}.
              </div>
              <div>
                <span role="img" aria-label="trophy">
                  🏆
                </span>{" "}
                {userInfo.score.low}
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
      </Card>
    </React.Fragment>
  );
}
