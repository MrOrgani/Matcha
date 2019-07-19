import React from "react";
import Fab from "@material-ui/core/Fab";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles({
  margin: {
    alignSelf: "flex-end",
    marginTop: 10 + "px",
    marginRight: 10 + "px"
  },
  menulist: {
    left: -189 + "px",
    top: 26 + "px"
  },
  menuItem: {
    fontSize: 1 + "em"
  },
  input: {
    display: "none"
  }
});

const options = ["Import a new Photo", "Delete this Photo"];

export default function OptionIcon() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  //   const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleMenuItemClick(event, index) {
    // setSelectedIndex(index);
    setOpen(false);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }
  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="Add"
      className={classes.margin}
      onClick={handleToggle}
    >
      <MoreVertIcon />
      <Popper
        open={open}
        className={classes.menulist}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map((option, index) =>
                    index === 1 ? (
                      <MenuItem
                        key={option}
                        //   disabled={index === 2}
                        //   selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                        className={classes.menuItem}
                      >
                        {option}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={option}
                        //   disabled={index === 2}
                        //   selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                        className={classes.menuItem}
                      >
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="outlined-button-file"
                          multiple
                          type="file"
                        />
                        <label htmlFor="outlined-button-file">{option}</label>
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fab>
  );
}
