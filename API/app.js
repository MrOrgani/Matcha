const express = require("express");
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const formData = require("express-form-data");

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(formData.parse());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

//===========================================================================

// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// app.post("/image-upload", (req, res) => {
//   console.log("in here");
//   const values = Object.values(req.files);
//   const promises = values.map(image => cloudinary.uploader.upload(image.path));

//   Promise.all(promises)
//     .then(results => res.json(results))
//     .catch(err => res.status(400).json(err));
// });

io.sockets.on("connection", socket => {
  const actualUsr = [];

  socket.emit("refreshingData"); // informs the front that a refresh occured to try and get user auth NOTE SECURED

  // console.log(
  //   "new user connection :",
  //   actualUsr,
  //   "connected User:",
  //   connectedUsrs
  // );
  const disconnectUser = _ => {
    // console.log(actualUsr);
    if (connectedUsrs[actualUsr]) {
      delete connectedUsrs[actualUsr];
      // console.log("a user is deleted from logout", actualUsr);
    }
    // actualUsr.length = 0;
    // console.log(
    //   "A user disconnected, Connected users are: ",
    //   connectedUsrs,
    //   "actualUser = ",
    //   actualUsr
    // );
  };

  socket
    .on("chat message", msg => {
      // console.log(actualUsr);
      msg.user = actualUsr;
      date = new Date();
      msg.h = date.getHours();
      msg.m = date.getMinutes();
      io.sockets.emit("chat message", msg);
      console.log("Message from id: " + socket.id, "with msg: ", msg.user);
    })
    .on("login", login => {
      actualUsr.length = 0;
      actualUsr.push(login);
      connectedUsrs[login] = true;
      io.sockets.emit("newUsr");
      // console.log(
      //   "connected Users are: ",
      //   connectedUsrs,
      //   "current Usr = ",
      //   actualUsr
      // );
    })
    .on("logOut", disconnectUser)
    .on("disconnect", () => {
      disconnectUser();
      // if (connectedUsrs[actualUsr]) {
      //   delete connectedUsrs[actualUsr];
      //   console.log(
      //     "A user disconnected from socket disconnect, Connected users are: ",
      //     connectedUsrs,
      //     "actualUser = ",
      //     actualUsr
      //   );
      // }
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

// const port = 5000;
// app.listen(port, () => console.log(`Connect on port ${port}`));
