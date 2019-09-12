import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AugmentedAvatar from "../../../Augmented Avatar/AugmentedAvatar";

export default function NotificationCard(props) {
  const display = {};
  display.picture = Number.isInteger(props.notif.source.indexOfPP.low)
    ? props.notif.source.pics[props.notif.source.indexOfPP.low]
    : props.notif.source.pics[props.notif.source.indexOfPP];

  display.time = `${props.notif.info.d}:${props.notif.info.h}:${props.notif.info.m}`;
  if (props.notif.info.type === "message") display.type = "sent you a message.";
  else if (props.notif.info.type === "visited")
    display.type = "checked you out";
  else if (props.notif.info.type === "disliked")
    display.type = "does not like you anymore";
  else if (props.notif.info.type === "liked") display.type = "likes you";
  // console.log(props.notif.info);

  return (
    <div className="notificationCard">
      <AugmentedAvatar
        className="augmentedAvatar"
        targetUuid={props.notif.info.targetUuid}
        src={display.picture}
      />
      <Typography>{display.time}</Typography>
      <Typography>{display.type}</Typography>
      <Divider />
    </div>
  );
}
