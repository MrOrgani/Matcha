const router = require("express").Router();

// router.use("/users", require("./routes/userRoutes"));
// router.use("/auth", require("./routes/authRoutes"));

// Just for testing
router.use("/", require("./routes/index"));
router.use("/testAPI", require("./routes/testAPI"));
router.use("/register", require("./routes/register"));
router.use("/api/user", require("./routes/user"));

module.exports = router;
