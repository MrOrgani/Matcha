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
// how to organise your sockets files // https://stackoverflow.com/questions/23653617/socket-io-listen-events-in-separate-files-in-node-js
io.sockets.on("connect", socket => {
  const connectedUsrs = {};
  connectedUsrs[socket.id] = socket.handshake.query;

  require("./Sockets/onJoinRoom")(socket);
  require("./Sockets/onChatMessage")(socket, io);
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
  };
  socket.on("logOut", disconnectUser).on("disconnect", disconnectUser);
});
