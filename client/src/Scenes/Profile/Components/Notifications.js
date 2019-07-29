import React from "react";
import { notification } from "antd";

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    onClick: () => {
      console.log("Notification Clicked!");
    }
  });
  return <div />;
};

export default openNotification;
