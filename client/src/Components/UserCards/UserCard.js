import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { UserCardContext } from "./UserCardContext";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, isBlocked, setBlocked, userInfo] = useContext(
    UserCardContext
  );
  // console.log(userInfo);s

  return (
    <React.Fragment>
      <Card
        className={classes.card}
        onClick={() => {
          // console.log(userInfo);
        }}
      >
        <CardMedia className={classes.media} image={userInfo.picLarge} />
        <CardHeader
          avatar={
            <Avatar src={userInfo.picLarge} className={classes.avatarPicture} />
          }
          title={`${userInfo.firstName} ${userInfo.lastName[0]}.`}
          subheader={`Last connection: ${userInfo.lastConnection}\n ${
            userInfo.firstName
          } did not notice you yet `}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`I love watching facebook until I forget I exists`}
          </Typography>
          <ul>
            {userInfo.hobbies.map(hobby => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions disableSpacing>
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
              !isBlocked ? classes.isNotBlockedColor : classes.isBlockedColor
            }
          >
            <HighlightOffIcon />
          </IconButton>
          <Button className={classes.button}>FAKE ACCOUNT</Button>
        </CardActions>
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
    background: "transparent",
    boxShadow: "0px 0px 0px 0px",
    color: "primary",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  }
}));
