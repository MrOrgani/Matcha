import React, { useState, useContext, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import { AuthContext } from "../../../../AuthContext";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const filledNotifArray = [];

function NotificationBell() {
  const notifArray = new Array(0);
  const [socketContext, authContext] = useContext(AuthContext);
  const [nbNotif, setNbNotif] = useState(0);

  // THREE STEP PROCESS:
  // GET ALL NOTIF THAT WERE NOT SEEN FROM DB :
  //   recipient: brutNotif then notifArray
  //   getter: fetchDbNotif
  // FOR EACH NOTIF GET PROFILE
  //   recipient: filledNotifArray
  //   getter: fetchUserData
  // USE EFFECT TO GET PROFILE OF USERS ON EVERy NEW NOTIF
  useEffect(() => {
    function fetchUserData(elem) {
      return axios.get(
        `http://localhost:9000/api/user/findOne?jwt=${authContext.data.jwt}&uuidSource=${elem.uuidSource}&category=uuid`
      );
    }

    const fetchDbNotif = async () => {
      const brutNotif = await axios.get(
        `http://localhost:9000/api/notif?jwt=${authContext.data.jwt}&uuidSource=${authContext.data.uuid}&category=uuid`
      );
      if (brutNotif.data.length > 0)
        await brutNotif.data.forEach(elem => {
          notifArray.push(JSON.parse(elem));
        });
      setNbNotif(notifArray.length);
      console.log("number of notif was reset");
    };

    const fetchData = async _ => {
      if (notifArray.length === 0) await fetchDbNotif();
      const results = await Promise.all(notifArray.map(fetchUserData));
      filledNotifArray.length = 0;
      await results.forEach((elem, index) => {
        filledNotifArray.push({
          source: elem.data[0]._fields[0].properties,
          info: notifArray[index]
        });
      });
    };
    fetchData();
  }, [notifArray, authContext.data]);

  // SOCKET LISTNER
  useEffect(() => {
    socketContext.socket.on("newNotif", newNotif => {
      notifArray.push(newNotif);
      setNbNotif(notifArray.length);
    });
    return () => socketContext.socket.off("newNotif");
  }, [notifArray, socketContext]);

  // CLICKS ON AND OUTSIDE THE BELL
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const id = open ? "simple-popper" : undefined;

  const eraseNotif = () => {
    notifArray.length = 0;
    filledNotifArray.length = 0;
    axios.post("http://localhost:9000/api/notif/delete", {
      jwt: authContext.data.jwt,
      uuidSource: authContext.data.uuid
    });
    setNbNotif(0);
  };

  const handleNotif = e => {
    if (nbNotif > 0) {
      setAnchorEl(e.currentTarget);
      setOpen(true);
    }
  };

  const handleClickAway = () => {
    console.log("handle click Away");
    if (open) {
      setOpen(false);
      console.log("handle click Away, going to close it");
      eraseNotif();
    }
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <IconButton
          aria-label="show 17 new notifications"
          onClick={handleNotif}
        >
          <Badge badgeContent={nbNotif} className="bell">
            <NotificationsIcon color="action" />
          </Badge>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List>
                    {filledNotifArray.map((el, index) => {
                      // return filledNotifArray[index + 1] &&
                      //   filledNotifArray[index].props.notif.info.type ==
                      //     filledNotifArray[index + 1].props.notif.info
                      //       .type ? null : (
                      //   <NotificationCard notif={el} key={index} />
                      // ); //TRYING TO FILTER NOTIFICATIONS
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

export default NotificationBell;
