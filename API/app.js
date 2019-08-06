const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formData = require("express-form-data");

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
io.sockets.on("connection", socket => {
  connectedUsrs[socket.id] = socket.handshake.query;
  // console.log("socket", socket);
  console.log(
    "new socket connection :",
    socket.id,
    "connected User:",
    connectedUsrs
  );
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
  };

  socket
    .on("chatMessage", msg => {
      // const msg = {};
      msg.login = connectedUsrs[socket.id].login;
      date = new Date();
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      // msg.content = content;
      io.sockets.emit("chatMessage", msg);
      console.log(
        "Message from id: " + socket.id,
        "from: ",
        msg.login,
        "with msg:",
        msg.content
      );
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
