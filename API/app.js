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
app.set("connectedUsrs", connectedUsrs);
// ABOUT LOGIN AND CONNECTION :
// IF CONNECTION AND CONNECTION ON OTHER TAB ADN ONE DISCTONNECT --> OTHER DISCONNECTED
// MAYBE : NOT ALLOW CONNECTION WHEN CONNECTED OR CHECK IF CONNECTED
// io.set("transports", ["websocket"]);
io.sockets.on("connection", socket => {
  connectedUsrs[socket.id] = socket.handshake.query;
  const connectionInfo = {};
  // console.log(conn);
  // console.log(socket.handshake.query.login);

  if (connectionInfo)
    console.log(
      "new user connection :",
      socket.id,
      "connected User:",
      connectedUsrs
    );
  const disconnectUser = reason => {
    // console.log(connectionInfo.usr);
    console.log("reason", reason);
    // delete connectedUsrs[socket.id]
    if (connectedUsrs[socket.id]) {
      delete connectedUsrs[socket.id];
      // app.set("connectedUsrs", connectedUsrs);
      console.log("a user is deleted from logout", connectionInfo.usr);
    } else {
      console.log("tryed to deconnect without being connected to socket");
    }
    // connectionInfo.usr.length = 0;
    console.log(
      "A user disconnected, Connected users are: ",
      connectedUsrs,
      "actualUser = ",
      connectionInfo.usr
    );
  };

  socket
    .on("chat message", content => {
      const msg = {};
      console.log(connectionInfo.usr);
      msg.user = connectionInfo.usr;
      date = new Date();
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      msg.content = content;
      io.sockets.emit("chat message", msg);
      console.log("Message from id: " + socket.id, "with msg: ", msg.user);
    })
    .on("login", login => {
      connectionInfo.usr = login;
      connectedUsrs[login] = true;
      app.set("connectedUsrs", connectedUsrs);
      // io.sockets.emit("newUsr");
      console.log(
        "connected Users are: ",
        connectedUsrs,
        "current Usr = ",
        connectionInfo.usr
      );
    })
    .on("logOut", disconnectUser)
    .on("disconnect", reason => {
      console.log(reason);
      console.log("disconnnnnnnnnnect");
      disconnectUser(reason);
      // if (connectedUsrs[connectionInfo.usr]) {
      //   delete connectedUsrs[connectionInfo.usr];
      //   console.log(
      //     "A user disconnected from socket disconnect, Connected users are: ",
      //     connectedUsrs,
      //     "actualUser = ",
      //     connectionInfo.usr
      //   );
      // }
    });
  // socket.emit("refreshingData"); // informs the front that a refresh occured to try and get user auth NOTE SECURED
});

// exports.isConnectedToChat = function() {
//   console.log(connectedUSrs);
// }

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// const port = 5000;
// app.listen(port, () => console.log(`Connect on port ${port}`));
