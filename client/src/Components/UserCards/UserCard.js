import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { UserCardContext } from "./UserCardContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import Button from "@material-ui/core/Button";
import "./UserCard.css";
import { AuthContext } from "../../AuthContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Spin, Icon } from "antd";

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, isBlocked, setBlocked, userInfo] = useContext(
    UserCardContext
  );

  const [loading, setLoading] = useState(true);

  const [socketContext] = useContext(AuthContext);
  setTimeout(() => setLoading(false), 1000);

  console.log("socketContext", socketContext);
  const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

  return (
    <React.Fragment>
      <Card className="theCard">
        <div className="mainCard">
          <Carousel showIndicators={false}>
            {userInfo.pics.map((pic, index) => (
              <div key={index}>
                <img
                  alt="userPic"
                  style={{ width: "auto", height: "700px" }}
                  src={pic}
                />

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
                      <button className={classes.button}>FAKE ACCOUNT</button>
                      {loading && <Spin indicator={antIcon} />}
                      {loading &&
                      socketContext.connectedUsrs.includes(userInfo.uuid)
                        ? !loading && (
                            <span
                              role="img"
                              aria-label="connected"
                              style={{ color: "green" }}
                            >
                              ✅ Connected
                            </span>
                          )
                        : !loading && (
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
      backgroundColor: "HotPink",
      color: "white"
    }
  },
  isLikedColor: {
    color: "HotPink"
  },
  isNotBlockedColor: {
    color: "darkGrey",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  },
  isBlockedColor: {
    color: "red"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatarPicture: {
    // margin: 10,
    width: 60,
    height: 60
  },
  button: {
    // background: "transparent",
    // boxShadow: "0px 0px 0px 0px",
    color: "DarkGrey",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  }
}));
