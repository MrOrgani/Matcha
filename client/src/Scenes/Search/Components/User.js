import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserCard from "../../../Components/UserCards/UserCard";
import { UserCardContext } from "../../../Components/UserCards/UserCardContext";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 150,
    margin: 2,
    height: 200,
    borderRadius: 15
  },
  media: {
    height: 0,
    paddingTop: "150%" // 16:9
  },
  root: {
    marginTop: 150
  },
  isNotLikedColor: {
    color: "white",
    "&:hover": {
      backgroundColor: "HotPink",
      color: "white"
    }
  },
  isLikedColor: {
    color: "HotPink"
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
  }
}));

const User = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [isLiked, handleLike, , , userInfo] = useContext(UserCardContext);

  function handleClick() {
    setExpanded(!expanded);
    setOpenCard(true);
  }

  function handleCloseCard() {
    setOpenCard(false);
  }

  return (
    <React.Fragment>
      <CardMedia className={classes.card} image={userInfo.picLarge}>
        <div className={classes.root}>
          <IconButton
            className={
              !isLiked ? classes.isNotLikedColor : classes.isLikedColor
            }
            aria-label="Add to favorites"
            onClick={handleLike}
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
