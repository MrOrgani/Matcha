const router = require("express").Router();

// router.use("/users", require("./routes/userRoutes"));
// router.use("/auth", require("./routes/authRoutes"));

// ROUTES
router.use("/api/user", require("./routes/user"));

// Just for testing
router.use("/", require("./routes/index"));
router.use("/testAPI", require("./routes/testAPI"));
router.use("/register", require("./routes/register"));

module.exports = router;
