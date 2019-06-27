const createError = require("http-errors");
const express = require("express");
require("dotenv").config(); //STORE PASSWORD AND LOGIN IN .ENV
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// app.use(logger("dev"));
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// IMPORT ROUTES
const router = require("./router");
app.use("/", router);

// ==================== MAXIME'S CODE TO AUTH USER =============================

// const authRoute = require("./router/routes/auth");
// CONTACT DB
// const neo4j = require("neo4j-driver").v1;
// const driver = neo4j.driver(
//   "bolt://localhost",
//   neo4j.auth.basic("neo4j", "2j54A%")
// );
// USELESS
// const session = driver.session();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/user", authRoute);

// app.use("/", function(req, res) {
//   res.send("API is working properly");
// });

// ============================================================================

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
