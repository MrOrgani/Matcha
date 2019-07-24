// const createError = require("http-errors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");

const io = require("socket.io")(server);

// SERVER LISTENS
server.listen(9000, () => console.log("listening on 9000"));

//MIDDLEWARE
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

// SOCKET MANAGEMENT FOR RT CHAT
const connectedUsrs = {};

io.sockets.on("connection", socket => {
  // io.sockets.emit("connectedUsr", connectedUsrs);
  const actualUsr = [];

  console.log(
    "new user connection :",
    actualUsr,
    "connected User:",
    connectedUsrs
  );
  const disconnectUser = _ => {
    console.log(actualUsr);
    if (connectedUsrs[actualUsr]) {
      delete connectedUsrs[actualUsr];
      console.log("a user is deleted from logout", actualUsr);
    }
    // actualUsr.length = 0;
    console.log(
      "A user disconnected, Connected users are: ",
      connectedUsrs,
      "actualUser = ",
      actualUsr
    );
  };

  socket
    .on("chat message", msg => {
      console.log(actualUsr);
      msg.user = actualUsr;
      date = new Date();
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      io.sockets.emit("chat message", msg);
      console.log("Message from id: " + socket.id, "with msg: ", msg.user);
    })
    .on("login", login => {
      actualUsr.push(login);
      connectedUsrs[login] = true;
      io.sockets.emit("newUsr");
      console.log("connected Users are: ", connectedUsrs);
    })
    .on("logOut", disconnectUser)
    .on("disconnect", () => {
      // disconnectUser();
      console.log(
        "A user disconnected from socket disconnect, Connected users are: ",
        connectedUsrs,
        "actualUser = ",
        actualUsr
      );
    });
});
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

module.exports = app;
