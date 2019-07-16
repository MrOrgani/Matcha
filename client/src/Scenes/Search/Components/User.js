// import React from "react";
// import "../public/stylesheet/style.css";

// const User = props => {
//   return (
//     <div className="profile">
//       <img src={props.value.picMedium} />
//     </div>
//   );
// };

// export default User;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 150,
    margin: 2,
    height: 200,
    borderRadius: 15,
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  media: {
    height: 0,
    paddingTop: "150%" // 16:9
  },
  root: {
    marginTop: 150
  },
  isNotLiked: {
    color: "white"
  },
  isLiked: {
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
  const [colored, setColored] = React.useState(false);

  function handleClick() {
    setExpanded(!expanded);
  }

  function handleColor() {
    setColored(!colored);
  }

  return (
    <CardMedia className={classes.card} image={props.value.picLarge}>
      <div className={classes.root}>
        <IconButton
          className={!colored ? classes.isNotLiked : classes.isLiked}
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{props.value.firstName}</Typography>
          <Typography paragraph>{props.value.bio}</Typography>
        </CardContent>
      </Collapse>
    </CardMedia>
  );
};

export default User;
