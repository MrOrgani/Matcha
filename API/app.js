const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formData = require("express-form-data");
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const connectionEmit = require("./Sockets/connectedUsers");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

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
const connectedUsrs = {};

io.sockets.on("connect", socket => {
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
    connectionEmit(io, connectedUsrs);
  };

  connectedUsrs[socket.id] = socket.handshake.query;
  require("./Sockets/onJoinRoom")(socket);
  require("./Sockets/onChatMessage")(socket, io);
  require("./Sockets/newNotif")(socket, io);
  connectionEmit(io, connectedUsrs);
  socket.on("logOut", disconnectUser).on("disconnect", disconnectUser);
});
