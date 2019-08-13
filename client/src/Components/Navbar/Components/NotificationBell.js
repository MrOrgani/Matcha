import React, { useState, useContext, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../../../AuthContext";

function NotificationBell() {
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(
    socketContext.notifArray ? socketContext.notifArray.length : 0
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleNotif = e => {
    console.log(socketContext.notifArray);
    console.log(socketContext.notifArray.length);
    setAnchorEl(anchorEl ? null : e.currentTarget);
    // socketContext.context.emit("notifSeen");
  }; // next up design an element (similar to the login ones where you display all the events) then link it to the db

  if (socketContext.notifArray) {
    socketContext.socket.on("newNotif", newNotif => {
      console.log("newNotif", newNotif);
      // console.log(setNotifArray);
      socketContext.notifArray.push(newNotif);
      setNbNotif(socketContext.notifArray.length);
      console.log("notifs for this socket:", socketContext.notifArray);
    });
  }

  //POPPER DOC: https://material-ui.com/components/popper/
  return (
    <div>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleNotif}
      >
        <Badge badgeContent={nbNotif} color="primary">
          <NotificationsIcon />
        </Badge>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography>The content of the Popper.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </IconButton>
    </div>
  );
}

export default NotificationBell;
