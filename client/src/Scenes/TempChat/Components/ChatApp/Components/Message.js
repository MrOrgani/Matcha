import React, { useContext } from "react";
import "../ChatApp.css";
import { TempChatContext } from "../../../TempChatContext";
import Avatar from "@material-ui/core/Avatar";

const Message = props => {
  const [chatAppContext] = useContext(TempChatContext);
  let fromMe = "";
  let displayName = "";
  // console.log(props);
  if (props.uuidViewer === props.uuidSource) fromMe = "from-me";
  else displayName = chatAppContext.chatTarget.displayName;

  return (
    <div className={`pictureAndMessage ${fromMe}`}>
      <Avatar
        className="avatar"
        alt={displayName}
        src={chatAppContext.chatTarget.picture}
      />
      <div className={`message ${fromMe}`}>
        <div className="username">{displayName}</div>
        <div className="message-body">{props.content}</div>
      </div>
    </div>
  );
};

export default Message;
