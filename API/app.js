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
  // const chatTarget = {};
  connectedUsrs[socket.id] = socket.handshake.query;
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
  };

  socket.on("joinRoom", chatTargetFromClient => {
    socket.chatTarget = {
      uuid: chatTargetFromClient.uuid
    }; //SECURITY HAZARD INFO FROM FRONT
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
      socket.chatTarget.uuid > userSourceUuid
        ? socket.chatTarget.uuid.concat(userSourceUuid)
        : userSourceUuid.concat(socket.chatTarget.uuid);
    console.log("joining room", roomID);
    socket.join(roomID);
  });

  const axios = require("axios");
  socket
    .on("chatMessage", msg => {
      // console.log("received CHAT MESSAGE IN BACK: ", msg);
      let userSourceUuid = connectedUsrs[socket.id].uuid;
      date = new Date();
      msg.uuidSource = userSourceUuid;
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      msg.target = socket.chatTarget.uuid;

      let roomID =
        socket.chatTarget.uuid > userSourceUuid
          ? socket.chatTarget.uuid + userSourceUuid
          : userSourceUuid + socket.chatTarget.uuid;
      // console.log(
      //   "SENDING TO CLIENT SOCKET: ",
      //   msg,
      //   socket.chatTarget,
      //   userSourceUuid
      // );
      if (socket.chatTarget.uuid && userSourceUuid) {
        axios.post("http://localhost:9000/api/chatMessages/", msg);
        // .then(res => console.log(res));
        // console.log(msg);
        // console.log("emiting to all clients in room ", roomID);
        io.to(roomID).emit("chatMessage", msg);
      }

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
