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

function NotificationBell() {
  const notifArray = [];
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(0);
  // socketContext.notifArray ? socketContext.notifArray.length : 0
  // );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const id = open ? "simple-popper" : undefined;

  const handleNotif = e => {
    console.log("onclick, fillednotif :", filledNotifArray);
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClickAway = () => {
    console.log("click away", notifArray);
    if (open) {
      console.log("click away, notif errased", notifArray);
      notifArray.length = 0;
      filledNotifArray.length = 0;
      axios.post("http://localhost:9000/api/notif/delete", {
        jwt: authContext.data.jwt,
        uuidSource: authContext.data.uuid
      });
      setNbNotif(0);
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log(
      "useEffect for original db notif",
      typeof notifArray,
      notifArray
    );
    fetchDbNotif();
    console.log("useEffect for original db notif", typeof notifArray);
  }, []);

  const fetchDbNotif = async () => {
    //FIRST GET THE NOTIF IN BRUTE MODE
    const brutNotif = await axios.get(
      `http://localhost:9000/api/notif?jwt=${authContext.data.jwt}&uuidSource=${
        authContext.data.uuid
      }&category=uuid`
    );
    // console.log("brutNotif", brutNotif.data);
    await brutNotif.data.forEach(elem => {
      notifArray.push(JSON.parse(elem));
    });
    setNbNotif(notifArray.length);
    // console.log("notif array from the brut db = ", notifArray);
  };

  useEffect(() => {
    fetchData();
    console.log("use effect for augmented data: notifArray", filledNotifArray);
  }, [notifArray]);

  const fetchData = async _ => {
    // if (notifArray.length === 0) return;
    console.log("notifArray in the augmented effeect", typeof notifArray);
    const promises = notifArray.map(elem => {
      console.log(elem);
      let api = `http://localhost:9000/api/user/findOne?jwt=${
        authContext.data.jwt
      }&uuidSource=${elem.uuidSource}&category=uuid`;
      const responses = axios.get(api);
      return responses;
    });
    const results = await Promise.all(promises);
    console.log("result before map", results);
    await results.map((elem, index) => {
      filledNotifArray.push({
        source: elem.data[0]._fields[0].properties,
        info: notifArray[index]
      });
    });
    // console.log("useEffect, filledNotifArray", filledNotifArray);
  };

  socketContext.socket.on("newNotif", newNotif => {
    console.log("socket Notif, actual array:", notifArray);
    notifArray.push(newNotif);
    setNbNotif(notifArray.length);
    console.log("notifs for this socket:", newNotif);
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
