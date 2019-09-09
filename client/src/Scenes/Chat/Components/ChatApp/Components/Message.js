import React, { useContext } from "react";
import "../ChatApp.css";
import { ChatContext } from "../../../ChatContext";
import Avatar from "@material-ui/core/Avatar";

const Message = props => {
  const [chatAppContext] = useContext(ChatContext);
  let fromMe = "";
  let displayName = "";
  // console.log(props);
  if (props.uuidViewer === props.uuidSource) fromMe = "from-me";
  else displayName = chatAppContext.chatTarget.displayName;

  return (
    <div className={`pictureAndMessage ${fromMe}`}>
      {chatAppContext.chatTarget.matched ? (
        <Avatar
          className="avatar"
          alt={displayName}
          src={chatAppContext.chatTarget.picture}
        />
      ) : null}
      <div className={`message ${fromMe}`}>
        {chatAppContext.chatTarget.matched ? (
          <div className="username">{displayName}</div>
        ) : null}
        <div className="message-body">{props.content}</div>
      </div>
    </div>
  );
};

export default Message;
