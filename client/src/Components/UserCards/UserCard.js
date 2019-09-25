import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../AuthContext";
import { UserCardContext } from "./UserCardContext";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import "./UserCard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, isBlocked, setBlocked, userInfo] = useContext(
    UserCardContext
  );

  const [socketContext] = useContext(AuthContext);

  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <React.Fragment>
      <Card className="theCardFull">
        <div className="mainCard">
          <Carousel showIndicators={false} showThumbs={false}>
            {userInfo.pics.map((pic, index) => (
              <div key={index}>
                <img
                  alt="userPic"
                  className="userPic"
                  style={{ width: "auto" }}
                  src={pic}
                />

                <div className="showHim">
                  <div className="userName">
                    {capFLtr(userInfo.firstName)} {userInfo.lastName[0]}.
                  </div>
                  <div className="backRect">
                    <div>
                      {userInfo.age}, {userInfo.city}.
                    </div>
                    <div>
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
                          !isLiked
                            ? classes.isNotLikedColor
                            : classes.isLikedColor
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
                      {/* {socketContext.connectedUsrs.includes(userInfo.uuid) ? (
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
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Card>
      <Card className="theCardSmall">
        <div className="mainCard">
          <Carousel showIndicators={false} showThumbs={false}>
            {userInfo.pics.map((pic, index) => (
              <div key={index}>
                <img
                  alt="userPic"
                  className="userPic"
                  style={{ width: "auto" }}
                  src={pic}
                />

                <div className="showHim">
                  <div className="userName">
                    {capFLtr(userInfo.firstName)} {userInfo.lastName[0]}.
                  </div>
                  <div className="backRect">
                    <div className="spans">
                      <span>
                        {userInfo.age}, {userInfo.city}.
                      </span>
                      <span>
                        <span role="img" aria-label="trophy">
                          🏆
                        </span>{" "}
                        {userInfo.score}
                      </span>
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
                  <div className="interButt">
                    <IconButton
                      onClick={setLiked}
                      className={
                        !isLiked
                          ? classes.isNotLikedColor
                          : classes.isLikedColor
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
                    {/* {socketContext.connectedUsrs.includes(userInfo.uuid) ? (
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
                      )} */}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Card>
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
    color: "DarkGrey",
    "&:hover": {
      backgroundColor: "#FF8E53",
      color: "#f5f5f5"
    }
  }
}));
