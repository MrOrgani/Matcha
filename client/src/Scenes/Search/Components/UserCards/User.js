import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserCard from "./UserCard";
import { UserCardContext } from "./UserCardContext";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 150,
    margin: 2,
    height: 200,
    borderRadius: 15
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  media: {
    height: 0,
    paddingTop: "150%" // 16:9
  },
  root: {
    marginTop: 150
  },
  isNotColored: {
    color: "white"
  },
  isColored: {
    color: "red"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // backgroundColor: red[500]
  }
}));

const User = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [isLiked, setLiked, userInfo] = useContext(UserCardContext);

  function handleClick() {
    setExpanded(!expanded);
    setOpenCard(true);
  }

  function handleCloseCard() {
    setOpenCard(false);
  }

  function handleColor() {
    setLiked(!isLiked);
  }

  return (
    <React.Fragment>
      <CardMedia className={classes.card} image={userInfo.picLarge}>
        <div className={classes.root}>
          <IconButton
            className={!isLiked ? classes.isNotColored : classes.isColored}
            aria-label="Add to favorites"
            onClick={handleColor}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardMedia>
      <Dialog open={openCard} onClose={handleCloseCard}>
        <UserCard />
      </Dialog>
    </React.Fragment>
  );
};

export default User;
