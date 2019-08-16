import React, { useState, useContext, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { AuthContext } from "../../../../AuthContext";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const filledNotifArray = [];
const notifArray = [];

function NotificationBell() {
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(0);
  // socketContext.notifArray ? socketContext.notifArray.length : 0
  // );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const id = open ? "simple-popper" : undefined;

  const handleNotif = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  //   data &&
  //   data.notifs &&
  //   data.notifs.forEach(elem => {
  //     notifArray.push(JSON.parse(elem));
  //   });
  // console.log("notifs from the Auth Socketcontext:", notifArray)

  const handleClickAway = () => {
    if (open) {
      socketContext.notifArray = [];
      axios.post("http://localhost:9000/api/notif/delete", {
        jwt: authContext.data.jwt,
        uuidSource: authContext.data.uuid
      });
      setNbNotif(0);
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log(socketContext.notifArray);
    fetchData();
  }, [nbNotif]);

  const fetchData = async _ => {
    const promises = socketContext.notifArray.map(elem => {
      let api = `http://localhost:9000/api/user/findOne?jwt=${
        authContext.data.jwt
      }&uuidSource=${elem.uuidSource}&category=uuid`;
      const responses = axios.get(api);
      return responses;
    });
    const results = await Promise.all(promises);
    await results.map((elem, index) => {
      filledNotifArray.push({
        source: elem.data[0]._fields[0].properties,
        info: socketContext.notifArray[index]
      });
    });
    console.log("useEffect, filledNotifArray", filledNotifArray);
  };

  socketContext.socket.on("newNotif", newNotif => {
    socketContext.notifArray.push(newNotif);
    setNbNotif(socketContext.notifArray.length);
    console.log("notifs for this socket:", socketContext.notifArray);
  });

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
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
                  <List>
                    {filledNotifArray.map((el, index) => {
                      console.log(el, index);
                      return <NotificationCard notif={el} key={index} />;
                    })}
                  </List>
                </Paper>
              </Fade>
            )}
          </Popper>
        </IconButton>
      </ClickAwayListener>
    </div>
  );
}

{
  /* <List>
{menuItems.map(menuItem => (
  <IconsAndLinks key={menuItem.text} param={menuItem} />
))}
<Divider />
{["About us"].map((text, index) => (
  <ListItem button key={index}>
    <ListItemText primary={text} />
  </ListItem>
))}
</List> */
}
export default NotificationBell;
