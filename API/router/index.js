const router = require("express").Router();

// router.use("/users", require("./routes/userRoutes"));
// router.use("/auth", require("./routes/authRoutes"));

// ROUTES
router
  .use("/api/user", require("./routes/user"))
  .use("/api/rel", require("./routes/routeRel"))
  .use("/api/notif", require("./routes/routeNotif"))
  .use("/api/tempchat", require("./routes/routeTempChat"))
  .use("/api/getusers", require("./routes/getusers"))
  .use("/api/chatMessages", require("./routes/chatMessages"));
// router.use("/api/rel", require("./routes/routeRel"));

// Just for testing
// router.use("/testAPI", require("./routes/testAPI"));
// router.use("/register", require("./routes/register"));

module.exports = router;
