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
  const notifArray = new Array(0);
  // console.log(typeof notifArray);
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(0);
  const [displayNotif, setDisplayNotif] = useState([]);
  // socketContext.notifArray ? socketContext.notifArray.length : 0
  // );

  useEffect(() => {
    console.log("use effect for augmented data: notifArray", notifArray);
    fetchData();
  }, []);

  function fetchUserData(elem) {
    let api = `http://localhost:9000/api/user/findOne?jwt=${
      authContext.data.jwt
    }&uuidSource=${elem.uuidSource}&category=uuid`;
    const responses = axios.get(api);
    return responses;
  }

  const fetchDbNotif = async () => {
    const brutNotif = await axios.get(
      `http://localhost:9000/api/notif?jwt=${authContext.data.jwt}&uuidSource=${
        authContext.data.uuid
      }&category=uuid`
    );
    await brutNotif.data.forEach(elem => {
      notifArray.push(JSON.parse(elem));
    });
    setNbNotif(notifArray.length);
  };

  async function addUserData(notifArray) {
    const promises = notifArray.map(fetchUserData);
    const results = await Promise.all(promises);
    console.log("result before map", results);
    setDisplayNotif(
      await results.map((elem, index) => {
        return {
          source: elem.data[0]._fields[0].properties,
          info: notifArray[index]
        };
      })
    );
  }

  const fetchData = async _ => {
    // console.log("useEffect, fetchDbNotif", typeof notifArray, notifArray);
    if (notifArray.length === 0) await fetchDbNotif();
    // if (notifArray.length === 0) return;
    // console.log("notifArray in the augmented effeect", notifArray);
    addUserData(notifArray);
    // console.log("useEffect, filledNotifArray", filledNotifArray);
  };

  // SOCKET LISTNER

  socketContext.socket.on("newNotif", newNotif => {
    console.log("SOCKET NEWWWWWWsNOTIF, actual notifarray:", notifArray);
    console.log("notifs for this socket:", newNotif);
    notifArray.push(newNotif);
    addUserData(notifArray);
    setNbNotif(notifArray.length);
  });

  // CLICKS ON AND OUTSIDE THE BELL

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
      setDisplayNotif([]);
      // filledNotifArray.length = 0;
      axios.post("http://localhost:9000/api/notif/delete", {
        jwt: authContext.data.jwt,
        uuidSource: authContext.data.uuid
      });
      setNbNotif(0);
    }
    setOpen(false);
  };

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
                    {displayNotif.map((el, index) => (
                      <NotificationCard notif={el} key={index} />
                    ))}
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

export default NotificationBell;
