import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const MenuButton = () => {
  const classes = useStyles();
  return (
    <div>
      <Fab color="primary" aria-label="Menu" className={classes.fab}>
        <MenuIcon />
      </Fab>
    </div>
  );
};

export default MenuButton;
