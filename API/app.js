const createError = require("http-errors");
const express = require("express");
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(logger("dev"));
// app.use(express.static(path.join(__dirname, "public")));

// DIRIGE VERS LE ROUTER CENTRAL
const router = require("./router");
app.use("/", router);

// app.use("/", indexRoute);
// app.use("/users", usersRoute);
// app.use("/testAPI", testAPIRouter);
// // app.use(express.cookieParser());

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

module.exports = app;
