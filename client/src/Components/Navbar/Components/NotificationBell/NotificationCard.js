import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
export default function NotificationCard(props) {
  // console.log(props.notif.source);
  // if (props.notif.source.fileList) console.log("passed the test");
  const display = {};
  display.picture =
    props.notif.source &&
    props.notif.source.fileList &&
    props.notif.source.fileList[0] &&
    JSON.parse(props.data.fileList[0]).url;

  if (props.notif.info.type === "message") display.type = "sent you a message.";
  else if (props.notif.info.type === "visited")
    display.type = "checked you out.";

  return (
    <div className="notificationCard">
      <Avatar src={display.picture} />
      <Typography>{display.type}</Typography>
      <Divider />
      {/* <Card>
        <CardMedia>
        <CardHeader>
          <Typography>test</Typography>
        </CardHeader>
        <CardContent>
        <Typography>{props.notif.info.type}</Typography>
        </CardContent>
      </CardMedia>
      <Divider />
      </Card> */}
    </div>
  );
}
