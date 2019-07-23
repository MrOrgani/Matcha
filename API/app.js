// const createError = require("http-errors");
const express = require("express");
// const server = require("http").Server(app);
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
// const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");
const app = express();
// const socket = require("socket.io").listen(httpServer);

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

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
const cloudinary = require("cloudinary");
const formData = require("express-form-data");
// const { CLIENT_ORIGIN } = require("./config");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// app.use(
//   cors({
//     origin: CLIENT_ORIGIN
//   })
// );

app.use(formData.parse());

app.post("/image-upload", (req, res) => {
  console.log("values", req.files);
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  console.log("promises", promises);

  Promise.all(promises).then(results => {
    res.json(results);
    console.log("res", results);
  });
});
module.exports = app;
