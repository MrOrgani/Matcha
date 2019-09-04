import React, { useState, useContext } from "react";
import "./UserInMenu.css";
import { ChatContext } from "../../../ChatContext";
import { UserCardProvider } from "../../../../../Components/UserCards/UserCardContext";
import Dialog from "@material-ui/core/Dialog";
import UserCard from "../../../../../Components/UserCards/UserCard";
import { AuthContext } from "../../../../../AuthContext";
// import { AuthContext } from "../../../../../AuthContext";

const UserInMenu = props => {
  //BASIC DISPLAY fOR THE USER NAME AND PIC
  const [chatAppContext] = useContext(ChatContext);
  function capFLtr(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // console.log("props matched", props);
  const picture =
    props.data.pics && props.data.pics[0] && JSON.parse(props.data.pics[0]).url;

  //CARD DISPLAY FOR THE USER CARDS
  const [, authContext] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  function handleExpandCard() {
    setExpanded(!expanded);
    setOpenCard(true);
  }
  function handleCloseCard() {
    setOpenCard(false);
  }
  console.log(
    "inuserMenu, available info is:",
    props.data,
    "available session data",
    authContext.data
  );

  // console.log(JSON.parse(props.data.pics[0]).url);
  return (
    <div
      style={{ display: "flex" }}
      onClick={async () => {
        // console.log(props.data);
        await chatAppContext.setChatTarget({
          matched: props.matched ? true : false,
          uuid: props.data.uuid,
          displayName:
            capFLtr(props.data.firstName) + " " + capFLtr(props.data.lastName),
          picture: picture
        });
        if (!props.matched) handleExpandCard();
      }}
    >
      <img
        style={{ borderRadius: "50%", width: "20%", height: "20%" }}
        alt=""
        src={picture}
      />
      <div
        style={{
          width: "10px",
          height: "10px",
          marginTop: "14%",
          marginLeft: "-5%",
          background: "red",
          borderRadius: "50%",
          border: "solid grey 2px"
        }}
      />
      <div
      // style={{
      //   alignSelf: "flex-end",
      //   fontFamily: "Raleway",
      //   fontSize: "2em",
      //   paddingLeft: "1em",
      //   fontStyle: "italic",
      //   background: "black"
      // }}
      >
        {capFLtr(props.data.firstName || "Unknown User")}{" "}
        {capFLtr((props.data.lastName && props.data.lastName[0]) || "  ")}
        {/* <UserCardProvider user={} session={}>
         */}
        {!props.matched ? (
          <UserCardProvider user={props.data} session={authContext.data}>
            <Dialog open={openCard} onClose={handleCloseCard}>
              <UserCard />
            </Dialog>
          </UserCardProvider>
        ) : null}
      </div>
    </div>
  );
};

export default UserInMenu;
