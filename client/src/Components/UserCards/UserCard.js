import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../AuthContext";
import { UserCardContext } from "./UserCardContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import "./UserCard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, isBlocked, setBlocked, userInfo] = useContext(
    UserCardContext
  );

  const [socketContext] = useContext(AuthContext);

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
    userInfo.pics,
    state
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
            <div className="interButt">
              <IconButton
                onClick={setLiked}
                className={
                  !isLiked ? classes.isNotLikedColor : classes.isLikedColor
                }
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                onClick={setBlocked}
                className={
                  !isBlocked
                    ? classes.isNotBlockedColor
                    : classes.isBlockedColor
                }
              >
                <HighlightOffIcon />
              </IconButton>
              <Button className={classes.button}>FAKE ACCOUNT</Button>
              {socketContext.connectedUsrs.includes(userInfo.uuid) ? (
                <span
                  role="img"
                  aria-label="connected"
                  style={{ color: "green" }}
                >
                  ✅ Connected
                </span>
              ) : (
                <span
                  role="img"
                  aria-label="disconnected"
                  style={{ color: "grey" }}
                >
                  🔴 {userInfo.lastConnection}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  isNotLikedColor: {
    color: "DarkGrey",
    "&:hover": {
      backgroundColor: "#FE6B8B",
      color: "#f5f5f5"
    }
  },
  isLikedColor: {
    color: "#FE6B8B"
  },
  isNotBlockedColor: {
    color: "darkGrey",
    "&:hover": {
      backgroundColor: "#FF8E53",
      color: "#f5f5f5"
    }
  },
  isBlockedColor: {
    color: "#FF8E53"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatarPicture: {
    width: 60,
    height: 60
  },
  button: {
    background: "transparent",
    boxShadow: "0px 0px 0px 0px",
    color: "primary",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  }
}));
