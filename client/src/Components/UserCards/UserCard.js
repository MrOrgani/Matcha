import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import Typography from "@material-ui/core/Typography";
import { UserCardContext } from "./UserCardContext";
// import CardHeader from "@material-ui/core/CardHeader";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import "./UserCard.css";
import { AuthContext } from "../../AuthContext";
// import { Spring } from "react-spring/renderprops";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, isBlocked, setBlocked, userInfo] = useContext(
    UserCardContext
  );
  const [socketContext] = useContext(AuthContext);

  // console.log("userInfo", userInfo);
  return (
    <React.Fragment>
      <Card className="theCard">
        <div className="mainCard">
          <Carousel showIndicators={false}>
            {userInfo.pics.map((pic, index) => (
              <div key={index}>
                <img style={{ width: "auto", height: "700px" }} src={pic} />

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
