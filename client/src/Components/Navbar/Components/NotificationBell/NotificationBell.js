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

const filledNotifArray = [];

function NotificationBell() {
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(
    socketContext.notifArray ? socketContext.notifArray.length : 0
  );
  // const [filledNotifArray, setFilledNotifArray] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleNotif = e => {
    console.log("filledNotifArray", filledNotifArray);
    setAnchorEl(anchorEl ? null : e.currentTarget);
    // socketContext.context.emit("notifSeen");
  }; // next up design an element (similar to the login ones where you display all the events) then link it to the db

  // if (socketContext.notifArray) {
  socketContext.socket.on("newNotif", newNotif => {
    console.log("newNotif", newNotif);
    // console.log(setNotifArray);
    socketContext.notifArray.push(newNotif);
    setNbNotif(socketContext.notifArray.length);
    console.log("notifs for this socket:", socketContext.notifArray);
  });

  useEffect(() => {
    // console.log("useEffect");
    fetchData();
  }, []);

  //QUESTION Should i put all the info in the context for notifArray
  //--> lot of info passed to all pages
  // SHould i keep it here --> adds a bit of complexity
  const fetchData = async _ => {
    const promises = socketContext.notifArray.map(elem => {
      console.log(elem);
      let api = `http://localhost:9000/api/user/findOne?jwt=${
        authContext.data.jwt
      }&uuidSource=${elem.uuidSource}&category=uuid`;
      const responses = axios.get(api);
      return responses;
    });
    const results = await Promise.all(promises);
    // console.log("reusls", results);
    await results.map((elem, index) => {
      // console.log(elem.data[0]._fields[0].properties);
      filledNotifArray.push({
        source: elem.data[0]._fields[0].properties,
        info: socketContext.notifArray[index]
      });
      // setFilledNotifArray(
      //   filledNotifArray.concat({
      //     sourceInfo: elem.data[0]._fields[0].properties,
      //     notifSource: socketContext.notifArray[index]
      //   })
      // );
    });
    console.log("useEffect, filledNotifArray", filledNotifArray);
  };

  // console.log(params);
  // }

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
                <List>
                  {filledNotifArray.map((el, index) => {
                    console.log(el, index);
                    return (
                      // <div key={`${index}`}>
                      //   <Typography>{el.info.type}</Typography>
                      //   <Divider />
                      // </div>
                      <NotificationCard notif={el} key={index} />
                    );
                  })}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </IconButton>
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
