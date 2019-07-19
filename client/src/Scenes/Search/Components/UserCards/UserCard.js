import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { UserCardContext } from "./UserCardContext";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  isNotColored: {
    color: "darkgrey"
  },
  isColored: {
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
  }
  // avatar: {
  //   backgroundColor: red[500]
  // }
}));

export default function UserCard() {
  const classes = useStyles();
  const [isLiked, setLiked, userInfo] = useContext(UserCardContext);

  function handleLike() {
    setLiked(!isLiked);
    // try {
    //   const result = axios.post("http://localhost:9000/api/rel/like", {
    //     source: MediaStreamEvent,
    //     target: userInfo.login
    //   });
    //   console.log(result);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <React.Fragment>
      <Card
        className={classes.card}
        onClick={() => {
          console.log(userInfo);
        }}
      >
        <CardMedia
          className={classes.media}
          image={userInfo.picLarge}
          title="Paella dish"
        />
        <CardHeader
          avatar={
            <Avatar src={userInfo.picLarge} className={classes.avatarPicture} />
          }
          title={`${userInfo.firstName} ${userInfo.lastName[0]}.`}
          subheader={`Last connection: ${userInfo.lastConnection}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`I love watching facebook until I forget I exists`}
          </Typography>
          <ul>
            {userInfo.hobbies.map(hobby => (
              <li>{hobby}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Add to favorites"
            onClick={handleLike}
            className={!isLiked ? classes.isNotColored : classes.isColored}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
