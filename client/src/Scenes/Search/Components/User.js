import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UserCard from "../../../Components/UserCards/UserCard";
import { AuthContext } from "../../../AuthContext";
import { UserCardContext } from "../../../Components/UserCards/UserCardContext";
import axios from "axios";
import { Modal } from "antd";

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
  isNotLikedColor: {
    color: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#FE6B8B",
      color: "#f5f5f5"
    }
  },
  isLikedColor: {
    color: "#FE6B8B"
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

const User = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [isLiked, handleLike, , , userInfo] = useContext(UserCardContext);
  const [socketContext, authContext] = useContext(AuthContext);

  function handleClick() {
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
    setExpanded(!expanded);
    setOpenCard(true);
  }

  const handleCancel = e => {
    setOpenCard(false);
  };

  return (
    <React.Fragment>
      <div
        className="card"
        style={{
          backgroundImage: `url('${userInfo.pics[userInfo.indexOfPP]}')`
        }}
      >
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
      </div>
      <Modal
        visible={openCard}
        onCancel={handleCancel}
        centered={true}
        footer={null}
        wrapClassName="modalContainer"
      >
        <UserCard />
      </Modal>
    </React.Fragment>
  );
};

export default User;
