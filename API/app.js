const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const formData = require("express-form-data");
global.io = require("socket.io")(server);
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// SERVER LISTENS
server.listen(9000, () => console.log("listening on 9000"));

//MIDDLEWARE
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(formData.parse());

const FortyTwoStrategy = require("passport-42").Strategy;
const passport = require("passport");
//PASSPORT SETUP MUST BE BEFORE THE CENTRAL ROUTER TO BE
passport.use(
  new FortyTwoStrategy(
    {
      clientID:
        "df73b3fc5349efbfe57212d545fa735865396e52b4255c89e2302a385f0ab970",
      clientSecret:
        "879768eaf73a693d8feb1db647223d29be6555d3bd667ad6bf42d6adac9c3808",
      callbackURL: "http://localhost:9000/api/Oauth/42/redirect"
    },
    (accessToken, refreshToken, profile, cb) => cb(null, profile)
  )
);
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));
app.use(passport.initialize(), passport.session());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

// SOCKET MANAGEMENT FOR RT CHAT
// how to organise your sockets files // https://stackoverflow.com/questions/23653617/socket-io-listen-events-in-separate-files-in-node-js
const connectionEmit = require("./Sockets/connectedUsers");
const connectedUsrs = {};

io.sockets.on("connect", async socket => {
  const disconnectUser = _ => {
    if (connectedUsrs[socket.id]) delete connectedUsrs[socket.id];
    connectionEmit(io, connectedUsrs);
  };
  connectedUsrs[socket.id] = socket.handshake.query;
  require("./Sockets/onJoinRoom")(socket);
  require("./Sockets/onChatMessage")(socket, io);
  require("./Sockets/newNotif").newNotifListener(socket, io);
  connectionEmit(io, connectedUsrs);
  socket
    .on("logOut", await disconnectUser)
    .on("disconnect", await disconnectUser);
});
