const router = require("express").Router();

// ROUTES
router
  .use("/api/user", require("./routes/user"))
  .use("/api/Oauth", require("./routes/routeOauth"))
  .use("/api/rel", require("./routes/routeRel"))
  .use("/api/notif", require("./routes/routeNotif"))
  .use("/api/chat", require("./routes/routeChat"))
  .use("/api/getusers", require("./routes/getusers"))
  .use("/api/chatMessages", require("./routes/chatMessages"));

module.exports = router;
