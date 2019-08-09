const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formData = require("express-form-data");
// const newMessages = require("./controlers/tempchat/newMessages");
const io = require("socket.io")(server);

// SERVER LISTENS
server.listen(9000, () => console.log("listening on 9000"));

//MIDDLEWARE
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(formData.parse());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

// SOCKET MANAGEMENT FOR RT CHAT
const connectedUsrs = {};
// ABOUT LOGIN AND CONNECTION :
// IF CONNECTION AND CONNECTION ON OTHER TAB ADN ONE DISCTONNECT --> OTHER DISCONNECTED
// MAYBE : NOT ALLOW CONNECTION WHEN CONNECTED OR CHECK IF CONNECTED
// doc pour les emit ect https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender

io.sockets.on("connect", socket => {
  const chatTarget = {};
  connectedUsrs[socket.id] = socket.handshake.query;
  // console.log("socket", socket.handshake.query);
  // console.log(
  //   "new socket connection :",
  //   socket.id,
  //   "connected User:",
  //   connectedUsrs
  // );
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
  };

  socket.on("joinRoom", chatTargetFromClient => {
    chatTarget.uuid = chatTargetFromClient.uuid; //SECURITY HAZARD INFO FROM FRONT
    let userSourceUuid = connectedUsrs[socket.id].uuid;
    // let userSourceDispla
    // console.log("room joining", userSourceUuuid);
    // console.log(
    //   "JOINJOIN chatTarget :",
    //   chatTarget.uuid,
    //   typeof chatTarget.uuid,
    //   "userSourceUuid :",
    //   userSourceUuid,
    //   typeof userSourceUuid
    // );
    // socket.join("test");

    // if (chatTarget.uuid > userSourceUuid) {
    // console.log(chatTarget.uuid > userSourceUuid);
    // console.log(chatTarget.uuid, userSourceUuid);
    // } else

    let roomID =
      chatTarget.uuid > userSourceUuid
        ? chatTarget.uuid.concat(userSourceUuid)
        : userSourceUuid.concat(chatTarget.uuid);
    // console.log(roomID);
    socket.join(roomID);
  });

  socket
    .on("chatMessage", msg => {
      console.log("received CHAT MESSAGE IN BACK: ", msg);
      let userSourceUuid = connectedUsrs[socket.id].uuid;
      msg.uuidSource = userSourceUuid;
      date = new Date();
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      msg.target = chatTarget.uuid;

      let roomID =
        chatTarget.uuid > userSourceUuid
          ? chatTarget.uuid + userSourceUuid
          : userSourceUuid + chatTarget.uuid;
      console.log("SENDING TO CLIENT SOCKET: ", msg);
      chatTarget && userSourceUuid && io.to(roomID).emit("chatMessage", msg);

      // console.log(
      //   "Message from id: " + socket.id,
      //   "from: ",
      //   msg.login,
      //   "with msg:",
      //   msg.content
      // );
    })
    // .on("login", login => {
    //   console.log("login", login);
    //   connectedUsrs[login] = true;
    //   console.log("connected Users are: ", connectedUsrs);
    // })
    .on("logOut", disconnectUser)
    .on("disconnect", reason => {
      // console.log("disconnnnnnnnnnect, reason is:", reason);
      disconnectUser(reason);
    });
});
