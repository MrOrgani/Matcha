var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRoute = require("./routes/index");
var testAPIRouter = require("./routes/testAPI");
var cors = require("cors");

var express = require("express");
var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// ==================== MAXIME'S CODE TO AUTH USER =============================

const authRoute = require("./routes/auth");

const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "2j54A%")
);
const session = driver.session();

app.use("/api/user", authRoute);

app.use("/", function(req, res) {
  res.send("API is working properly");
});

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

const port = 5000;
app.listen(port, () => console.log(`Connect on port ${port}`));

// module.exports = app;
