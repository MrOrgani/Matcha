import React, { useState, useContext } from "react";
import "./UserInMenu.css";
import { ChatContext } from "../../../ChatContext";
import { UserCardProvider } from "../../../../../Components/UserCards/UserCardContext";
import Dialog from "@material-ui/core/Dialog";
import UserCard from "../../../../../Components/UserCards/UserCard";
import { AuthContext } from "../../../../../AuthContext";
import AugmentedAvatar from "../../../../../Components/Augmented Avatar/AugmentedAvatar";

const UserInMenu = props => {
  //BASIC DISPLAY fOR THE USER NAME AND PIC
  const [chatAppContext] = useContext(ChatContext);
  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const picture = props.data.pics[props.data.indexOfPP];

  //CARD DISPLAY FOR THE USER CARDS
  const [socketContext, authContext] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  function handleExpandCard() {
    socketContext.socket.emit("newNotif", {
      uuidSource: authContext.data.uuid,
      targetUuid: props.data.uuid,
      jwt: authContext.data.jwt,
      type: "visited"
    });
    setExpanded(!expanded);
    setOpenCard(true);
  }
  function handleCloseCard() {
    setOpenCard(false);
  }

  return (
    <>
      <div
        style={{ display: "flex" }}
        onClick={async () => {
          if (props.matched) {
            await chatAppContext.setChatTarget({
              matched: props.matched ? true : false,
              uuid: props.data.uuid,
              displayName:
                capFLtr(props.data.firstName) +
                " " +
                capFLtr(props.data.lastName),
              picture: picture
            });
          } else handleExpandCard();
        }}
      >
        <AugmentedAvatar targetUuid={props.data.uuid} src={picture} />
        {capFLtr(props.data.firstName || "Unknown User")}{" "}
        {capFLtr((props.data.lastName && props.data.lastName[0]) || "  ")}
      </div>
      <div>
        {!props.matched ? (
          <UserCardProvider user={props.data} session={authContext.data}>
            <Dialog open={openCard} onClose={handleCloseCard}>
              <UserCard />
            </Dialog>
          </UserCardProvider>
        ) : null}
      </div>
      {/* </div> */}
    </>
  );
};

export default UserInMenu;
