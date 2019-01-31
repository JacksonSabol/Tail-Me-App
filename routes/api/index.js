const router = require("express").Router();
const walkerRoutes = require("./walkerRoutes");

// Walker Routes
router.use("/walker", walkerRoutes);

module.exports = router;
